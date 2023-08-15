import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { moviesApi } from '../misc/MoviesApi'
import MovieList from './MovieList'

function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      try {
        const response = await moviesApi.getMovies()
        const movies = response.data

        setMovies(movies)
      } catch (error) {
        handleLogError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovies()
  }, [])

  return (
    isLoading ? <></> : (
      <Container>
        <MovieList movies={movies} />
      </Container>
    )
  )
}

export default Home