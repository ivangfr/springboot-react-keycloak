import React, { Component } from 'react'
import { Container, Grid, Segment, Header } from 'semantic-ui-react'
import { withKeycloak } from 'react-keycloak'
import MovieForm from './MovieForm'
import MovieTable from './MovieTable'
import moviesApi from '../misc/movies-api'

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
    yearError: false,
    posterError: false,
  }

  state = {
    movies: [],
    form: { ...this.formInitialState },
  }

  componentDidMount() {
    this.getAllMovies()
  }

  handleChange = (e) => {
    const { id, value } = e.target
    const form = { ...this.state.form }
    form[id] = value
    this.setState({ form })
  }

  getAllMovies = () => {
    moviesApi.get('movies')
      .then(response => {
        const movies = response.data
        this.setState({ movies })
      })
  }

  saveMovie = () => {
    if (!this.isValidForm()) {
      return
    }

    const { keycloak } = this.props
    const { imdbId, title, director, year, poster } = this.state.form
    const movie = { imdbId: imdbId, title: title, director: director, year: year, poster: poster }

    moviesApi.post('movies', movie, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + keycloak.token
      }
    })
      .then(() => {
        this.clearForm()
        this.getAllMovies()
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteMovie = (id) => {
    const { keycloak } = this.props
    moviesApi.delete(`movies/${id}`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + keycloak.token
      }
    })
      .then(() => {
        this.getAllMovies()
      })
      .catch(error => {
        console.log(error)
      })
  }

  editMovie = (movie) => {
    const form = {
      imdbId: movie.imdbId,
      title: movie.title,
      director: movie.director,
      year: movie.year,
      poster: movie.poster,
      imdbIdError: false,
      titleError: false,
      directorError: false,
      yearError: false,
      posterError: false,
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
    const posterError = form.poster.trim() === ''

    form.imdbIdError = imdbIdError
    form.titleError = titleError
    form.directorError = directorError
    form.yearError = yearError
    form.posterError = posterError

    this.setState({ form })
    return (imdbIdError || titleError || directorError || yearError || posterError) ? false : true
  }

  render() {
    return (
      <Container>
        <Header as='h3' textAlign='center'>Movies</Header>
        <Grid>
          <Grid.Column width={4}>
            <Segment>
              <MovieForm
                form={this.state.form}
                handleChange={this.handleChange}
                saveMovie={this.saveMovie}
                clearForm={this.clearForm}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <MovieTable
                movies={this.state.movies}
                deleteMovie={this.deleteMovie}
                editMovie={this.editMovie}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default withKeycloak(Movie)