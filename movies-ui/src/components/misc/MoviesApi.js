import axios from 'axios'
import { config } from '../../Constants'

export const moviesApi = {
  getMovies,
  saveMovie,
  deleteMovie
}

function getMovies() {
  return instance.get('/api/movies')
}

function saveMovie(movie, token) {
  return instance.post('/api/movies', movie, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(token)
    }
  })
}

function deleteMovie(id, token) {
  return instance.delete(`/api/movies/${id}`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

// -- Helper functions

function bearerAuth(token) {
  return `Bearer ${token}`
}