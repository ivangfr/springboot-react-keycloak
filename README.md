# springboot-react-keycloak

Inside `springboot-react-keycloak` root folder run
```
docker-compose up -d

./init-keycloak.sh
```

Inside `springboot-react-keycloak/movies-api` run
```
./mvnw clean spring-boot:run -Dspring-boot.run.jvmArguments="-Dserver.port=9080"
```

```
ACCESS_TOKEN=$(curl -s -X POST \
  "http://localhost:8080/auth/realms/company-services/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=ivan.franchin" \
  -d "password=123" \
  -d "grant_type=password" \
  -d "client_secret=$MOVIESAPI_CLIENT_SECRET" \
  -d "client_id=movies-api" | jq -r .access_token)

echo $ACCESS_TOKEN
```

# TODO

- On logout redirect to '/';