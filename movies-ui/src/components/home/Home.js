import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import moviesApi from '../misc/movies-api'

class Home extends Component {
  state = {
    book: []
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = () => {
    moviesApi.get('movies')
    .then(response => {
      console.log(response)
    })
  }

  render() {
    return (
      <Container>
        <h1>Home</h1>
      </Container>
    )
  }
}

export default Home