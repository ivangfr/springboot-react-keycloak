import React, { Component } from 'react'
import { withKeycloak } from '@react-keycloak/web'
import { Container, Grid, Header, Segment, Icon, Divider } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { moviesApi } from '../misc/MoviesApi'
import MoviesForm from './MoviesForm'
import MoviesTable from './MoviesTable'
import { isAdmin } from '../misc/Helpers'
import { Redirect } from 'react-router-dom'
import ConfirmationModal from '../misc/ConfirmationModal'

class MoviesPage extends Component {
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

  modalInitialState = {
    isOpen: false,
    header: '',
    content: '',
    onAction: null,
    onClose: null
  }

  state = {
    movies: [],
    form: { ...this.formInitialState },
    modal: { ...this.modalInitialState },
    deleteMovie: null,
  }

  async componentDidMount() {
    this.handleGetMovies()
  }

  handleChange = (e) => {
    const { id, value } = e.target
    const form = { ...this.state.form }
    form[id] = value
    this.setState({ form })
  }

  handleGetMovies = async () => {
    try {
      const response = await moviesApi.getMovies()
      const movies = response.data
      this.setState({ movies })
    } catch (error) {
      handleLogError(error)
    }
  }

  handleSaveMovie = async () => {
    if (!this.isValidForm()) {
      return
    }

    const { keycloak } = this.props
    const { imdbId, title, director, year, poster } = this.state.form
    
    const movie = { imdbId, title, director, year, poster }
    try {
      await moviesApi.saveMovie(movie, keycloak.token)
      this.clearForm()
      this.handleGetMovies()
    } catch (error) {
      handleLogError(error)
    }
  }

  handleDeleteMovie = (movie) => {
    const modal = {
      isOpen: true,
      header: 'Delete Movie',
      content: `Would you like to delete movie '${movie.title}'?`,
      onAction: this.handleActionModal,
      onClose: this.handleCloseModal
    }
    this.setState({ modal, deleteMovie: movie })
    // The deletion is done in handleActionModal function
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
    this.setState({ form: { ...this.formInitialState } })
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

  handleActionModal = async (response) => {
    if (response) {
      const { keycloak } = this.props
      const { deleteMovie } = this.state

      try {
        await moviesApi.deleteMovie(deleteMovie.imdbId, keycloak.token)
        this.handleGetMovies()
      } catch (error) {
        handleLogError(error)
      }
    }
    this.setState({ modal: { ...this.modalInitialState } })
  }

  handleCloseModal = () => {
    this.setState({ modal: { ...this.modalInitialState } })
  }

  render() {
    const { keycloak } = this.props
    if (!isAdmin(keycloak)) {
      return <Redirect to='/' />
    }

    const { movies, form, modal } = this.state
    return (
      <Container>
        <Grid>
          <Grid.Column mobile={16} tablet={16} computer={4}>
            <Segment>
              <Header as='h2'>
                <Icon name='video camera' />
                <Header.Content>Movies</Header.Content>
              </Header>
              <Divider />
              <MoviesForm
                form={form}
                handleChange={this.handleChange}
                handleSaveMovie={this.handleSaveMovie}
                clearForm={this.clearForm}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={12}>
            <MoviesTable
              movies={movies}
              handleDeleteMovie={this.handleDeleteMovie}
              handleEditMovie={this.handleEditMovie}
            />
          </Grid.Column>
        </Grid>

        <ConfirmationModal modal={modal} />
      </Container>
    )
  }
}

export default withKeycloak(MoviesPage)