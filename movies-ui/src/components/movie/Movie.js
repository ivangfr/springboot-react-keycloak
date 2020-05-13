import React, { Component } from 'react'
import { withKeycloak } from '@react-keycloak/web'
import { Container, Grid, Header, Segment } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { moviesApi } from '../misc/MoviesApi'
import MovieForm from './MovieForm'
import MovieTable from './MovieTable'

class Movie extends Component {
  formInitialState = {
    imdbId: '',
    title: '',
    director: '',
    year: '',
    poster: '',

    imdbIdError: false,
    titleError: false,
    directorError: false,
    yearError: false
  }

  state = {
    movies: [],
    form: { ...this.formInitialState },
  }

  componentDidMount() {
    this.handleGetMovies()
  }

  handleChange = (e) => {
    const { id, value } = e.target
    const form = { ...this.state.form }
    form[id] = value
    this.setState({ form })
  }

  handleGetMovies = () => {
    moviesApi.getMovies()
      .then(response => {
        const movies = response.data
        this.setState({ movies })
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  handleSaveMovie = () => {
    if (!this.isValidForm()) {
      return
    }

    const { keycloak } = this.props
    const { imdbId, title, director, year, poster } = this.state.form
    const movie = { imdbId, title, director, year, poster }

    moviesApi.saveMovie(movie, keycloak.token)
      .then(() => {
        this.clearForm()
        this.handleGetMovies()
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  handleDeleteMovie = (id) => {
    const { keycloak } = this.props
    moviesApi.deleteMovie(id, keycloak.token)
      .then(() => {
        this.handleGetMovies()
      })
      .catch(error => {
        handleLogError(error)
      })
  }

  handleEditMovie = (movie) => {
    const form = {
      imdbId: movie.imdbId,
      title: movie.title,
      director: movie.director,
      year: movie.year,
      poster: movie.poster,
      imdbIdError: false,
      titleError: false,
      directorError: false,
      yearError: false
    }
    this.setState({ form })
  }

  clearForm = () => {
    this.setState({
      form: { ...this.formInitialState }
    })
  }

  isValidForm = () => {
    const form = { ...this.state.form }
    const imdbIdError = form.imdbId.trim() === ''
    const titleError = form.title.trim() === ''
    const directorError = form.director.trim() === ''
    const yearError = form.year.trim() === ''

    form.imdbIdError = imdbIdError
    form.titleError = titleError
    form.directorError = directorError
    form.yearError = yearError

    this.setState({ form })
    return (imdbIdError || titleError || directorError || yearError) ? false : true
  }

  render() {
    return (
      <Container>
        <Header as='h3' textAlign='center'>Movies</Header>
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Segment>
              <MovieForm
                form={this.state.form}
                handleChange={this.handleChange}
                handleSaveMovie={this.handleSaveMovie}
                clearForm={this.clearForm}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={12}>
            <Segment>
              <MovieTable
                movies={this.state.movies}
                handleDeleteMovie={this.handleDeleteMovie}
                handleEditMovie={this.handleEditMovie}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default withKeycloak(Movie)