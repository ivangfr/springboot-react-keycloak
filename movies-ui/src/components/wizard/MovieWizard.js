import React, { Component } from 'react'
import { withKeycloak } from '@react-keycloak/web'
import { Button, Container, Grid, Icon, Step, Divider } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { moviesApi } from '../misc/MoviesApi'
import { omdbApi } from '../misc/OmdbApi'
import CompleteStep from './CompleteStep'
import FormStep from './FormStep'
import SearchStep from './SearchStep'
import { Redirect } from 'react-router-dom'
import { isAdmin } from '../misc/Helpers'

class MovieWizard extends Component {
  state = {
    step: 1,

    // Search Step
    isLoading: false,
    searchText: '',
    movies: [],
    selectedMovie: null,

    // Form Step
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

  handlePreviousStep = () => {
    let { step, imdbIdError, titleError, directorError, yearError } = this.state

    if (step === 2) {
      imdbIdError = false
      titleError = false
      directorError = false
      yearError = false
    }

    step = step > 1 ? step - 1 : step
    this.setState({ step, imdbIdError, titleError, directorError, yearError })
  }

  handleNextStep = () => {
    let { step } = this.state

    if (step === 2 && !this.isValidForm()) {
      return
    }

    step = step < 3 ? step + 1 : step
    this.setState({ step })
  }

  handleChange = (e) => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  handleTableSelection = (movie) => {
    const { selectedMovie } = this.state

    if (movie && selectedMovie && movie.imdbId === selectedMovie.imdbId) {
      this.setState({
        selectedMovie: null,
        imdbId: '',
        title: '',
        director: '',
        year: '',
        poster: ''
      })
    } else {
      this.setState({
        selectedMovie: movie,
        imdbId: movie.imdbId,
        title: movie.title,
        director: movie.director,
        year: movie.year,
        poster: movie.poster
      })
    }
  }

  handleSearchMovies = async () => {
    this.setState({ isLoading: true })
    const {searchText} = this.state

    try {
      const response = await omdbApi.getMovies(searchText)
      let movies = []
        const { Error } = response.data
        if (Error) {
          console.log(Error)
        } else {
          const movie = {
            imdbId: response.data.imdbID,
            title: response.data.Title,
            director: response.data.Director,
            year: response.data.Year,
            poster: response.data.Poster
          }
          movies.push(movie)
        }
        this.setState({ movies, isLoading: false })
    } catch (error) {
      handleLogError(error)
    }
  }

  handleCreateMovie = async () => {
    const { keycloak } = this.props
    const { imdbId, title, director, year, poster } = this.state
    
    const movie = { imdbId, title, director, year, poster }
    try {
      await moviesApi.saveMovie(movie, keycloak.token)
      this.props.history.push("/home")
    } catch (error) {
      handleLogError(error)
    }
  }

  isValidForm = () => {
    const {imdbId, title, director, year} = this.state

    const imdbIdError = imdbId.trim() === ''
    const titleError = title.trim() === ''
    const directorError = director.trim() === ''
    const yearError = year.trim() === ''

    this.setState({ imdbIdError, titleError, directorError, yearError })
    return (imdbIdError || titleError || directorError || yearError) ? false : true
  }

  getContent = () => {
    const { step } = this.state

    let stepContent = null
    if (step === 1) {
      const { isLoading, searchText, movies, selectedMovie } = this.state
      stepContent = (
        <SearchStep
          searchText={searchText}
          isLoading={isLoading}
          movies={movies}
          selectedMovie={selectedMovie}
          handleChange={this.handleChange}
          handleSearchMovies={this.handleSearchMovies}
          handleTableSelection={this.handleTableSelection}
        />
      )
    } else if (step === 2) {
      const { imdbId, title, director, year, poster, imdbIdError, titleError, directorError, yearError } = this.state
      stepContent = (
        <FormStep
          imdbId={imdbId}
          title={title}
          director={director}
          year={year}
          poster={poster}
          imdbIdError={imdbIdError}
          titleError={titleError}
          directorError={directorError}
          yearError={yearError}
          handleChange={this.handleChange}
        />
      )
    } else if (step === 3) {
      const { imdbId, title, director, year, poster } = this.state
      const movie = { imdbId, title, director, year, poster }
      stepContent = (
        <CompleteStep movie={movie} />
      )
    }

    return (
      <Container>
        <Grid columns={2}>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <Step.Group fluid vertical >
              <Step active={step === 1}>
                <Icon name='search' />
                <Step.Content>
                  <Step.Title>Search</Step.Title>
                  <Step.Description>Search movie</Step.Description>
                </Step.Content>
              </Step>

              <Step active={step === 2}>
                <Icon name='film' />
                <Step.Content>
                  <Step.Title>Movie</Step.Title>
                  <Step.Description>Movie Form</Step.Description>
                </Step.Content>
              </Step>

              <Step active={step === 3}>
                <Icon name='flag checkered' />
                <Step.Content>
                  <Step.Title>Complete</Step.Title>
                  <Step.Description>Preview and complete</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>

            <Button.Group fluid>
              <Button
                disabled={step === 1}
                onClick={this.handlePreviousStep}>Back</Button>
              <Button.Or />
              <Button
                positive
                disabled={step === 3}
                onClick={this.handleNextStep}>Next</Button>
            </Button.Group>

            {step === 3 && (
              <>
                <Divider />
                <Button fluid color='blue' onClick={this.handleCreateMovie}>Create</Button>
              </>
            )}
          </Grid.Column>
          <Grid.Column mobile={16} tablet={12} computer={12}>
            {stepContent}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }

  render() {
    const { keycloak } = this.props
    return keycloak && keycloak.authenticated && isAdmin(keycloak) ? this.getContent() : <Redirect to='/' />
  }
}

export default withKeycloak(MovieWizard)