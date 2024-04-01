#!/usr/bin/env bash

if [[ -z $(docker ps --filter "name=keycloak" -q) ]]; then
  echo "[WARNING] You must initialize the envionment (./init-environment.sh) before initializing keycloak"
  exit 1
fi

KEYCLOAK_HOST_PORT=${1:-"localhost:8080"}
echo
echo "KEYCLOAK_HOST_PORT: $KEYCLOAK_HOST_PORT"

echo
echo "Getting admin access token"
echo "--------------------------"

ADMIN_TOKEN=$(curl -s -X POST "http://$KEYCLOAK_HOST_PORT/realms/master/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin" \
  -d 'password=admin' \
  -d 'grant_type=password' \
  -d 'client_id=admin-cli' | jq -r '.access_token')

echo "ADMIN_TOKEN=$ADMIN_TOKEN"
echo

echo "Creating company-services realm"
echo "-------------------------------"

curl -i -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"realm": "company-services", "enabled": true, "registrationAllowed": true}'

echo "Getting required action Verify Profile"
echo "--------------------------------------"

VERIFY_PROFILE_REQUIRED_ACTION=$(curl -s "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/authentication/required-actions/VERIFY_PROFILE" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq)

echo $VERIFY_PROFILE_REQUIRED_ACTION
echo

echo "Disabling required action Verify Profile"
echo "----------------------------------------"

NEW_VERIFY_PROFILE_REQUIRED_ACTION=$(echo "$VERIFY_PROFILE_REQUIRED_ACTION" | jq '.enabled = false')

echo $NEW_VERIFY_PROFILE_REQUIRED_ACTION
echo

curl -i -X PUT "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/authentication/required-actions/VERIFY_PROFILE" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$NEW_VERIFY_PROFILE_REQUIRED_ACTION"

echo "Creating movies-app client"
echo "--------------------------"

CLIENT_ID=$(curl -si -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/clients" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"clientId": "movies-app", "directAccessGrantsEnabled": true, "publicClient": true, "redirectUris": ["http://localhost:3000/*"]}' \
  | grep -oE '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')

echo "CLIENT_ID=$CLIENT_ID"
echo

echo "Creating the client role MOVIES_USER for the movies-app client"
echo "--------------------------------------------------------------"

curl -i -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/clients/$CLIENT_ID/roles" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "MOVIES_USER"}'

MOVIES_USER_CLIENT_ROLE_ID=$(curl -s http://localhost:8080/admin/realms/company-services/clients/$CLIENT_ID/roles/MOVIES_USER \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq -r '.id')

echo "MOVIES_USER_CLIENT_ROLE_ID=$MOVIES_USER_CLIENT_ROLE_ID"
echo

echo "Creating the client role MOVIES_ADMIN for the movies-app client"
echo "---------------------------------------------------------------"

curl -i -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/clients/$CLIENT_ID/roles" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "MOVIES_ADMIN"}'

MOVIES_ADMIN_CLIENT_ROLE_ID=$(curl -s http://localhost:8080/admin/realms/company-services/clients/$CLIENT_ID/roles/MOVIES_ADMIN \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq -r '.id')

echo "MOVIES_ADMIN_CLIENT_ROLE_ID=$MOVIES_ADMIN_CLIENT_ROLE_ID"
echo

echo "Creating USERS group"
echo "--------------------"
USERS_GROUP_ID=$(curl -si -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/groups" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "USERS"}' \
  | grep -oE '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')

echo "USERS_GROUP_ID=$USERS_GROUP_ID"
echo

echo "Creating ADMIN group"
echo "--------------------"
ADMINS_GROUP_ID=$(curl -si -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/groups" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "ADMINS"}' \
  | grep -oE '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')

echo "ADMINS_GROUP_ID=$ADMINS_GROUP_ID"
echo

echo "Adding USERS group as realm default group"
echo "-----------------------------------------"

curl -i -X PUT "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/default-groups/$USERS_GROUP_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

echo "Assigning MOVIES_USER client role to USERS group"
echo "------------------------------------------------"

curl -i -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/groups/$USERS_GROUP_ID/role-mappings/clients/$CLIENT_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "[{\"id\": \"$MOVIES_USER_CLIENT_ROLE_ID\", \"name\": \"MOVIES_USER\"}]"

echo "Assigning MOVIES_USER and MOVIES_ADMIN client roles to ADMINS group"
echo "-------------------------------------------------------------------"

curl -i -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/groups/$ADMINS_GROUP_ID/role-mappings/clients/$CLIENT_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "[{\"id\": \"$MOVIES_USER_CLIENT_ROLE_ID\", \"name\": \"MOVIES_USER\"}, {\"id\": \"$MOVIES_ADMIN_CLIENT_ROLE_ID\", \"name\": \"MOVIES_ADMIN\"}]"

echo "Creating 'user' user"
echo "--------------------"

USER_ID=$(curl -si -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/users" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "enabled": true, "credentials": [{"type": "password", "value": "user", "temporary": false}]}' \
  | grep -oE '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')

echo "USER_ID=$USER_ID"
echo

echo "Assigning USERS group to user"
echo "-----------------------------"

curl -i -X PUT "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/users/$USER_ID/groups/$USERS_GROUP_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

echo "Creating 'admin' user"
echo "---------------------"

ADMIN_ID=$(curl -si -X POST "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/users" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "enabled": true, "credentials": [{"type": "password", "value": "admin", "temporary": false}]}' \
  | grep -oE '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}')

echo "ADMIN_ID=$ADMIN_ID"
echo

echo "Assigning ADMINS group to admin"
echo "-------------------------------"

curl -i -X PUT "http://$KEYCLOAK_HOST_PORT/admin/realms/company-services/users/$ADMIN_ID/groups/$ADMINS_GROUP_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

echo "Getting user access token"
echo "-------------------------"

curl -s -X POST "http://$KEYCLOAK_HOST_PORT/realms/company-services/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user" \
  -d "password=user" \
  -d "grant_type=password" \
  -d "client_id=movies-app" | jq -r .access_token
echo

echo "Getting admin access token"
echo "--------------------------"

curl -s -X POST "http://$KEYCLOAK_HOST_PORT/realms/company-services/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" \
  -d "client_id=movies-app" | jq -r .access_token
echo