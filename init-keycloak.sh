#!/usr/bin/env bash

set -euo pipefail

if [[ -z $(docker ps --filter "name=keycloak" -q) ]]; then
  echo "[ERROR] You must initialize the environment (./init-environment.sh) before initializing Keycloak"
  exit 1
fi

KEYCLOAK_HOST_PORT=${1:-"localhost:8080"}
KEYCLOAK_BASE_URL="http://$KEYCLOAK_HOST_PORT"

echo
echo "KEYCLOAK_BASE_URL: $KEYCLOAK_BASE_URL"

echo
echo "Getting admin access token"
echo "--------------------------"

ADMIN_TOKEN=$(curl -s -X POST "$KEYCLOAK_BASE_URL/realms/master/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" \
  -d "client_id=admin-cli" | jq -r '.access_token')

if [[ -z "$ADMIN_TOKEN" || "$ADMIN_TOKEN" == "null" ]]; then
  echo "[ERROR] Failed to get admin token"
  exit 1
fi

echo

echo "Creating company-services realm"
echo "-------------------------------"
curl -si -X POST "$KEYCLOAK_BASE_URL/admin/realms" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"realm": "company-services", "enabled": true, "registrationAllowed": true}' || true

echo
echo "Disabling required action Verify Profile"
echo "----------------------------------------"

VERIFY_PROFILE=$(curl -s "$KEYCLOAK_BASE_URL/admin/realms/company-services/authentication/required-actions/VERIFY_PROFILE" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq '.enabled = false')

curl -si -X PUT "$KEYCLOAK_BASE_URL/admin/realms/company-services/authentication/required-actions/VERIFY_PROFILE" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$VERIFY_PROFILE"

echo

echo "Creating movies-app client"
echo "--------------------------"
curl -si -X POST "$KEYCLOAK_BASE_URL/admin/realms/company-services/clients" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"clientId": "movies-app", "directAccessGrantsEnabled": true, "publicClient": true, "redirectUris": ["http://localhost:3000/*"]}' || true

CLIENT_ID=$(curl -s "$KEYCLOAK_BASE_URL/admin/realms/company-services/clients?clientId=movies-app" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq -r '.[0].id')

echo "CLIENT_ID=$CLIENT_ID"
echo

echo "Creating the client role MOVIES_USER for the movies-app client"
echo "--------------------------------------------------------------"

curl -si -X POST "$KEYCLOAK_BASE_URL/admin/realms/company-services/clients/$CLIENT_ID/roles" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "MOVIES_USER"}' || true

MOVIES_USER_CLIENT_ROLE_ID=$(curl -s "$KEYCLOAK_BASE_URL/admin/realms/company-services/clients/$CLIENT_ID/roles/MOVIES_USER" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq -r '.id')

echo "MOVIES_USER_CLIENT_ROLE_ID=$MOVIES_USER_CLIENT_ROLE_ID"
echo

echo "Creating the client role MOVIES_ADMIN for the movies-app client"
echo "---------------------------------------------------------------"

curl -si -X POST "$KEYCLOAK_BASE_URL/admin/realms/company-services/clients/$CLIENT_ID/roles" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "MOVIES_ADMIN"}' || true

MOVIES_ADMIN_CLIENT_ROLE_ID=$(curl -s "$KEYCLOAK_BASE_URL/admin/realms/company-services/clients/$CLIENT_ID/roles/MOVIES_ADMIN" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq -r '.id')

echo "MOVIES_ADMIN_CLIENT_ROLE_ID=$MOVIES_ADMIN_CLIENT_ROLE_ID"
echo

echo "Creating USERS group"
echo "--------------------"
curl -si -X POST "$KEYCLOAK_BASE_URL/admin/realms/company-services/groups" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "USERS"}' || true
USERS_GROUP_ID=$(curl -s "$KEYCLOAK_BASE_URL/admin/realms/company-services/groups?search=USERS&exact=true" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq -r '.[0].id')

echo "USERS_GROUP_ID=$USERS_GROUP_ID"
echo

echo "Creating ADMINS group"
echo "---------------------"
curl -si -X POST "$KEYCLOAK_BASE_URL/admin/realms/company-services/groups" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "ADMINS"}' || true

ADMINS_GROUP_ID=$(curl -s "$KEYCLOAK_BASE_URL/admin/realms/company-services/groups?search=ADMINS&exact=true" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq -r '.[0].id')

echo "ADMINS_GROUP_ID=$ADMINS_GROUP_ID"
echo

echo "Adding USERS group as realm default group"
echo "-----------------------------------------"
curl -si -X PUT "$KEYCLOAK_BASE_URL/admin/realms/company-services/default-groups/$USERS_GROUP_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" || true
echo

echo "Assigning MOVIES_USER client role to USERS group"
echo "------------------------------------------------"

curl -si -X POST "$KEYCLOAK_BASE_URL/admin/realms/company-services/groups/$USERS_GROUP_ID/role-mappings/clients/$CLIENT_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "[{\"id\": \"$MOVIES_USER_CLIENT_ROLE_ID\", \"name\": \"MOVIES_USER\"}]" || true

echo
echo "Assigning MOVIES_USER and MOVIES_ADMIN client roles to ADMINS group"
echo "-------------------------------------------------------------------"

curl -si -X POST "$KEYCLOAK_BASE_URL/admin/realms/company-services/groups/$ADMINS_GROUP_ID/role-mappings/clients/$CLIENT_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "[{\"id\": \"$MOVIES_USER_CLIENT_ROLE_ID\", \"name\": \"MOVIES_USER\"}, {\"id\": \"$MOVIES_ADMIN_CLIENT_ROLE_ID\", \"name\": \"MOVIES_ADMIN\"}]" || true

echo

echo "Creating 'user' user"
echo "--------------------"

curl -si -X POST "$KEYCLOAK_BASE_URL/admin/realms/company-services/users" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "user", "enabled": true, "credentials": [{"type": "password", "value": "user", "temporary": false}]}' || true

USER_ID=$(curl -s "$KEYCLOAK_BASE_URL/admin/realms/company-services/users?username=user&exact=true" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq -r '.[0].id')

echo "USER_ID=$USER_ID"
echo

echo "Assigning USERS group to user"
echo "-----------------------------"

curl -si -X PUT "$KEYCLOAK_BASE_URL/admin/realms/company-services/users/$USER_ID/groups/$USERS_GROUP_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" || true

echo

echo "Creating 'admin' user"
echo "---------------------"

curl -si -X POST "$KEYCLOAK_BASE_URL/admin/realms/company-services/users" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "enabled": true, "credentials": [{"type": "password", "value": "admin", "temporary": false}]}' || true

ADMIN_ID=$(curl -s "$KEYCLOAK_BASE_URL/admin/realms/company-services/users?username=admin&exact=true" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | jq -r '.[0].id')

echo "ADMIN_ID=$ADMIN_ID"
echo

echo "Assigning ADMINS group to admin"
echo "-------------------------------"

curl -si -X PUT "$KEYCLOAK_BASE_URL/admin/realms/company-services/users/$ADMIN_ID/groups/$ADMINS_GROUP_ID" \
  -H "Authorization: Bearer $ADMIN_TOKEN" || true

echo

echo "Getting user access token"
echo "-------------------------"

curl -s -X POST "$KEYCLOAK_BASE_URL/realms/company-services/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user" \
  -d "password=user" \
  -d "grant_type=password" \
  -d "client_id=movies-app" | jq -r '.access_token'
echo
echo

echo "Getting admin access token"
echo "--------------------------"

curl -s -X POST "$KEYCLOAK_BASE_URL/realms/company-services/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin" \
  -d "password=admin" \
  -d "grant_type=password" \
  -d "client_id=movies-app" | jq -r '.access_token'
echo