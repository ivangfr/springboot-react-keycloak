#!/usr/bin/env bash

MONGO_VERSION="7.0.6"
POSTGRES_VERSION="16.1"
KEYCLOAK_VERSION="25.0.1"

source scripts/my-functions.sh

echo
echo "Starting environment"
echo "===================="

echo
echo "Creating network"
echo "----------------"
docker network create springboot-react-keycloak-net

echo
echo "Starting mongodb"
echo "----------------"

docker run -d \
  --name mongodb \
  -p 27017:27017 \
  --network=springboot-react-keycloak-net \
  mongo:${MONGO_VERSION}

echo
echo "Starting postgres"
echo "-----------------"

docker run -d \
    --name postgres \
    -p 5432:5432 \
    -e POSTGRES_DB=keycloak \
    -e POSTGRES_USER=keycloak \
    -e POSTGRES_PASSWORD=password \
    --network=springboot-react-keycloak-net \
    postgres:${POSTGRES_VERSION}

echo
echo "Starting keycloak"
echo "-----------------"

docker run -d \
    --name keycloak \
    -p 8080:8080 \
    -e KEYCLOAK_ADMIN=admin \
    -e KEYCLOAK_ADMIN_PASSWORD=admin \
    -e KC_DB=postgres \
    -e KC_DB_URL_HOST=postgres \
    -e KC_DB_URL_DATABASE=keycloak \
    -e KC_DB_USERNAME=keycloak \
    -e KC_DB_PASSWORD=password \
    --network=springboot-react-keycloak-net \
    quay.io/keycloak/keycloak:${KEYCLOAK_VERSION} start-dev

echo
wait_for_container_log "mongodb" "Waiting for connections"

echo
wait_for_container_log "postgres" "database system is ready"

echo
wait_for_container_log "keycloak" "started in"

echo
echo "Environment Up and Running"
echo "=========================="
echo