import React, { Component } from 'react'
import { Container, Grid, Step, Button, Icon } from 'semantic-ui-react'
import { withKeycloak } from 'react-keycloak'
import SearchStep from './SearchStep'
import FormStep from './FormStep'
import CompleteStep from './CompleteStep'
import omdbApi from '../misc/omdb-api'
import moviesApi from '../misc/movies-api'

class MovieWizard extends Component {
  state = {
    step: 1,

    // Search Step
    isLoading: false,
    search: '',
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
    yearError: false,
    posterError: false
  }

  previousStep = () => {
    let { step } = this.state

    let { imdbIdError, titleError, directorError, yearError, posterError } = this.state
    if (step === 2) {
      imdbIdError = false
      titleError = false
      directorError = false
      yearError = false
      posterError = false
    }

    step = step > 1 ? step - 1 : step
    this.setState({ step, imdbIdError, titleError, directorError, yearError, posterError })
  }

  nextStep = () => {
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

  searchMovies = () => {
    this.setState({ isLoading: true })

    omdbApi.get(`?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${encodeURI(this.state.search)}`)
      .then(response => {
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
        this.setState({
          movies,
          isLoading: false
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  createMovie = (movie) => {
    const { keycloak } = this.props

    moviesApi.post('movies', movie, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + keycloak.token
        }
      })
      .then((response) => {
        this.props.history.push("/home")
      })
      .catch(error => {
        console.log(error)
      })
  }

  isValidForm = () => {
    const imdbIdError = this.state.imdbId.trim() === ''
    const titleError = this.state.title.trim() === ''
    const directorError = this.state.director.trim() === ''
    const yearError = this.state.year.trim() === ''
    const posterError = this.state.poster.trim() === ''
    
    this.setState({ imdbIdError, titleError, directorError, yearError, posterError })
    return imdbIdError || titleError || directorError || yearError || posterError ? false : true
  }

  getContent = () => {
    const { step } = this.state

    let stepContent = null
    if (step === 1) {
      const { isLoading, search, movies, selectedMovie } = this.state
      stepContent = (
        <SearchStep
          search={search}
          isLoading={isLoading}
          movies={movies}
          selectedMovie={selectedMovie}
          handleChange={this.handleChange}
          searchMovies={this.searchMovies}
          handleTableSelection={this.handleTableSelection}
        />
      )
    } else if (step === 2) {
      const { imdbId, title, director, year, poster, imdbIdError, titleError, directorError, yearError, posterError } = this.state
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
          posterError={posterError}
          handleChange={this.handleChange}
        />
      )
    } else if (step === 3) {
      const { imdbId, title, director, year, poster } = this.state
      const movie = { imdbId, title, director, year, poster }
      stepContent = (
        <CompleteStep
          movie={movie}
          createMovie={this.createMovie}
        />
      )
    }

    return (
      <Container>
        <Grid>
          <Grid.Column width={4}>
            <Step.Group vertical>
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
                onClick={this.previousStep}>Back</Button>
              <Button.Or />
              <Button
                positive
                disabled={step === 3}
                onClick={this.nextStep}>Next</Button>
            </Button.Group>
          </Grid.Column>
          <Grid.Column width={12}>
            {stepContent}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }

  render() {
    const { keycloak } = this.props
    const { authenticated } = keycloak
    return keycloak && authenticated ? this.getContent() : <div></div>
  }
}

export default withKeycloak(MovieWizard)