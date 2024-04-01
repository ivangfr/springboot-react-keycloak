#!/usr/bin/env bash

echo
echo "Starting the environment shutdown"
echo "================================="

echo
echo "Removing containers"
echo "-------------------"
docker rm -fv mongodb keycloak postgres

echo
echo "Removing network"
echo "----------------"
docker network rm springboot-react-keycloak-net

echo
echo "Environment shutdown successfully"
echo "================================="
echo