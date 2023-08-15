import axios from 'axios'
import { config } from '../../Constants'

export const moviesApi = {
  getMovies,
  getMovie,
  saveMovie,
  deleteMovie,
  addMovieComment,
  getUserExtrasMe,
  saveUserExtrasMe
}

function getMovies() {
  return instance.get('/api/movies')
}

function getMovie(imdbId) {
  return instance.get(`/api/movies/${imdbId}`)
}

function saveMovie(movie, token) {
  return instance.post('/api/movies', movie, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function deleteMovie(imdbId, token) {
  return instance.delete(`/api/movies/${imdbId}`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function addMovieComment(imdbId, comment, token) {
  return instance.post(`/api/movies/${imdbId}/comments`, comment, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function getUserExtrasMe(token) {
  return instance.get(`/api/userextras/me`, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

function saveUserExtrasMe(token, userExtra) {
  return instance.post(`/api/userextras/me`, userExtra, {
    headers: { 'Authorization': bearerAuth(token) }
  })
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.response.use(response => {
  return response
}, function (error) {
  if (error.response.status === 404) {
    return { status: error.response.status }
  }
  return Promise.reject(error.response)
})

// -- Helper functions

function bearerAuth(token) {
  return `Bearer ${token}`
}