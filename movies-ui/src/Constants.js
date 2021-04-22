const prod = {
  url: {
    KEYCLOAK_BASE_URL: "https://keycloak.herokuapp.com",
    API_BASE_URL: 'https://myapp.herokuapp.com',
    OMDB_BASE_URL: 'https://www.omdbapi.com',
    AVATARS_DICEBEAR_URL: 'https://avatars.dicebear.com/api'
  }
}

const dev = {
  url: {
    KEYCLOAK_BASE_URL: "http://localhost:8080",
    API_BASE_URL: 'http://localhost:9080',
    OMDB_BASE_URL: 'https://www.omdbapi.com',
    AVATARS_DICEBEAR_URL: 'https://avatars.dicebear.com/api'
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod