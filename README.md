# `springboot-react-keycloak`

The goal of this project is to secure an application called `movies-app`, using [`Keycloak`](https://www.keycloak.org/). `movies-app` consists of two microservices: one is a [Spring-Boot](https://spring.io/projects/spring-boot) Rest API called `movies-api` and another is a [ReactJS](https://reactjs.org/) application called `movies-ui`.

## Project diagram

![project-diagram](images/project-diagram.png)

## Microservices

### movies-api

Spring-boot Java backend application that exposes a Rest API to manage **movies**. Its sensitive endpoints - like create, update and delete - can just be accessed if a JWT token issued by `Keycloak` is provided. `movies-api` stores its data in a [`Mongo`](https://www.mongodb.com/) database.

### movies-ui

ReactJS frontend application where `users` can see the list of movies and `admins` can manage movies. In order to access the `Admin` section, the `admin` should login using his/her username/password. Those credentials are handled by `Keycloak`. All the requests from `movies-ui` to sensitive endpoints in `movies-api` have the presence of the JWT token that is generated when the `admin` logs in. It uses [`Semantic UI React`](https://react.semantic-ui.com/) as CSS-styled framework.

## OMDb API

- To use the `Wizard` option to search and add a movie, you need to get an API KEY from [OMDb API](https://www.omdbapi.com/). In order to do it, access https://www.omdbapi.com/apikey.aspx and follow the steps provided by the website.

- Once you have the API KEY, in `springboot-react-keycloak` root folder, create a file called `.env.local` with the following content
```
REACT_APP_OMDB_API_KEY=<your-api-key>
```

## Start environment

- In a terminal and inside `springboot-react-keycloak` root folder run
```
docker-compose up -d
```

- Wait a little bit until all containers are Up (healthy). You can check their status running
```
docker-compose ps
```

## Configure Keycloak

- In a terminal and inside `springboot-react-keycloak` root folder, run the following script to configure `movies-app` in Keycloak
```
./init-keycloak.sh
```

- At the end of the script, it will be printed the secret that Keycloak generates for `movies-app`
```
MOVIESAPP_CLIENT_SECRET=...
```

- Copy the secret value and paste in `credentials.secret` property present in `springboot-react-keycloak/movies-ui/public/keycloak.json` file.

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

## Microservices URLs

| Microservice | URL                                   |
| ------------ | ------------------------------------- |
| `movie-api`  | http://localhost:9080/swagger-ui.html |
| `movie-ui`   | http://localhost:3000                 |
| `Keycloak`   | http://localhost:8080                 |

## Demo

The gif below shows an admin adding two movies using the wizard option. First, he looks for the movie `american pie`. The search is looking for data at [OMDb API](https://www.omdbapi.com/). Then, he selects the movie in the table. The information on the form is already fulfilled based on the response from OMDb API. The preview of the movie card, as the customer will see it, is displayed. Finally, the button `Create` is pressed and the movie is created. After that, the movie `resident evil` is created.

![add-movies-wizard](images/add-movies-wizard.gif)

## Shutdown

To stop and remove containers, networks and volumes
```
docker-compose down -v
```

## TODO

- add confirmation dialog before deleting a movie
