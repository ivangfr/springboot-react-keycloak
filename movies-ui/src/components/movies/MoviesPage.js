import React, { useEffect, useState } from 'react'
import { Container, Grid, Header, Segment, Icon, Divider } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { moviesApi } from '../misc/MoviesApi'
import MoviesForm from './MoviesForm'
import MoviesTable from './MoviesTable'
import { isAdmin } from '../misc/Helpers'
import { Navigate } from 'react-router-dom'
import ConfirmationModal from '../misc/ConfirmationModal'
import { useKeycloak } from '@react-keycloak/web'

const formInitialState = {
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

const modalInitialState = {
  isOpen: false,
  header: '',
  content: '',
  onAction: null,
  onClose: null
}

function MoviesPage() {

  const [movies, setMovies] = useState([])
  const [form, setForm] = useState({ ...formInitialState })
  const [modal, setModal] = useState({ ...modalInitialState })
  const [movieToBeDeleted, setMovieToBeDeleted] = useState(null)

  const { keycloak } = useKeycloak()

  useEffect(() => {
    handleGetMovies()
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [id]: value }))
  }

  const handleGetMovies = async () => {
    try {
      const response = await moviesApi.getMovies()
      const movies = response.data
      setMovies(movies)
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleSaveMovie = async () => {
    if (!isValidForm()) {
      return
    }

    const { imdbId, title, director, year, poster } = form
    const movie = { imdbId, title, director, year, poster }
    try {
      await moviesApi.saveMovie(movie, keycloak.token)
      clearForm()
      handleGetMovies()
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleDeleteMovie = (movie) => {
    const modal = {
      isOpen: true,
      header: 'Delete Movie',
      content: `Would you like to delete movie '${movie.title}'?`,
      onAction: handleActionModal,
      onClose: handleCloseModal
    }
    setMovieToBeDeleted(movie)
    setModal(modal)
    // The deletion is done in handleActionModal function
  }

  const handleEditMovie = (movie) => {
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
    setForm(form)
  }

  const clearForm = () => {
    setForm({ ...formInitialState })
  }

  const isValidForm = () => {
    const imdbIdError = form.imdbId.trim() === ''
    const titleError = form.title.trim() === ''
    const directorError = form.director.trim() === ''
    const yearError = form.year.trim() === ''

    setForm((prevForm) => ({
      ...prevForm,
      imdbIdError,
      titleError,
      directorError,
      yearError
    }))

    return !(imdbIdError || titleError || directorError || yearError)
  }

  const handleActionModal = async (response, movie) => {
    if (response) {
      try {
        await moviesApi.deleteMovie(movie.imdbId, keycloak.token)
        handleGetMovies()
      } catch (error) {
        handleLogError(error)
      }
    }
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setModal({ ...modalInitialState })
    setMovieToBeDeleted(null)
  }

  if (!isAdmin(keycloak)) {
    return <Navigate to='/' />
  }

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
              handleChange={handleChange}
              handleSaveMovie={handleSaveMovie}
              clearForm={clearForm}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={12}>
          <MoviesTable
            movies={movies}
            handleDeleteMovie={handleDeleteMovie}
            handleEditMovie={handleEditMovie}
          />
        </Grid.Column>
      </Grid>

      <ConfirmationModal
        modal={modal}
        movie={movieToBeDeleted}
      />
    </Container>
  )
}

export default MoviesPage