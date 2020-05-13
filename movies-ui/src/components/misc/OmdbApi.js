import axios from 'axios'
import { config } from '../../Constants'

export const omdbApi = {
  getMovies
}

function getMovies(text) {
  return instance.get(`?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${encodeURI(text)}`)
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.OMDB_BASE_URL
})