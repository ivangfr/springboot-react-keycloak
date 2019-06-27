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