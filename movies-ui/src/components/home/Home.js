import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { moviesApi } from '../misc/MoviesApi'
import MovieList from './MovieList'

class Home extends Component {
  state = {
    isLoading: false,
    movies: []
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    moviesApi.getMovies()
      .then(response => {
        const movies = response.data
        this.setState({ movies, isLoading: false })
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  render() {
    const { isLoading, movies } = this.state
    return (
      <Container>
        <MovieList isLoading={isLoading} movies={movies} />
      </Container>
    )
  }
}

export default Home