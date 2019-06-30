import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import moviesApi from '../misc/movies-api'
import MovieList from './MovieList'

class Home extends Component {
  state = {
    isLoading: false,
    movies: []
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = () => {
    this.setState({ isLoading: true })

    moviesApi.get('movies')
      .then(response => {
        const movies = response.data
        this.setState({
          isLoading: false,
          movies
        })
      })
      .catch(error => {
        console.log(error)
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