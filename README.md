# springboot-react-keycloak

The goal of this project is to secure an application called `movies-app`, using Keycloak. `movies-app` consists of two microservices: one is a Spring-Boot Java backend application called `movies-api` and another is a ReactJS user interface called `movies-ui`.

## Project diagram

## Microservices

### movies-api

### movies-ui

## Build Docker Images

### movies-api

### movies-ui

## Start environment

Inside `springboot-react-keycloak` root folder run
```
docker-compose up -d
```

## Configuring Keycloak

Run the script below to configure `movies-app` in Keycloak
```
./init-keycloak.sh
```

## Running movies-app using Maven & Npm

### movies-api

Inside `springboot-react-keycloak/movies-api` run
```
./mvnw clean spring-boot:run -Dspring-boot.run.jvmArguments="-Dserver.port=9080"
```

### movies-ui

Inside `springboot-react-keycloak/movies-ui` run
```
npm start
```

## Shutdown
To stop and remove containers, networks and volumes
```
docker-compose down -v
```

## TODO

- add confirmation dialog before deleting a book or a author
