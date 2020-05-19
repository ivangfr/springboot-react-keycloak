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

  async componentDidMount() {
    this.setState({ isLoading: true })
    try {
      const response = await moviesApi.getMovies()
      const movies = response.data
      this.setState({ movies, isLoading: false })
    } catch (error) {
      handleLogError(error)
    }
  }

  render() {
    const { isLoading, movies } = this.state
    return (
      isLoading ? <></> : (
        <Container>
          <MovieList movies={movies} />
        </Container>
      )
    )
  }
}

export default Home