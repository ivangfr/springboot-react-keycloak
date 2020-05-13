const prod = {
  url: {
    API_BASE_URL: 'https://myapp.herokuapp.com',
    OMDB_BASE_URL: 'https://www.omdbapi.com'
  }
}

const dev = {
  url: {
    API_BASE_URL: 'http://localhost:9080',
    OMDB_BASE_URL: 'https://www.omdbapi.com'
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod