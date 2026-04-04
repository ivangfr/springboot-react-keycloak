#!/usr/bin/env bash
set -euo pipefail

echo
echo "Starting the environment shutdown"
echo "================================="

echo
echo "Removing containers"
echo "-------------------"
docker rm -fv mongodb keycloak postgres 2>/dev/null || true

echo
echo "Removing network"
echo "----------------"
docker network rm springboot-react-keycloak-net 2>/dev/null || true

echo
echo "Environment shutdown successfully"
echo "================================="
echo