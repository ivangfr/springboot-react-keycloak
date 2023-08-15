import React, { useState } from 'react'
import { Button, Container, Grid, Icon, Step, Divider } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { moviesApi } from '../misc/MoviesApi'
import { omdbApi } from '../misc/OmdbApi'
import CompleteStep from './CompleteStep'
import FormStep from './FormStep'
import SearchStep from './SearchStep'
import { Navigate } from 'react-router-dom'
import { isAdmin } from '../misc/Helpers'
import { useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

function MovieWizard() {

  const [step, setStep] = useState(1)

  // Search Step
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  // Form Step
  const [imdbId, setImdbId] = useState('')
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [year, setYear] = useState('')
  const [poster, setPoster] = useState('')
  const [imdbIdError, setImdbIdError] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [directorError, setDirectorError] = useState(false)
  const [yearError, setYearError] = useState(false)

  const navigate = useNavigate()
  const { keycloak } = useKeycloak()

  const handlePreviousStep = () => {
    if (step === 2) {
      setImdbIdError(false)
      setTitleError(false)
      setDirectorError(false)
      setYearError(false)
    }
    setStep(step > 1 ? step - 1 : step)
  }

  const handleNextStep = () => {
    if (step === 2 && !isValidForm()) {
      return
    }
    setStep(step < 3 ? step + 1 : step)
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'searchText') {
      setSearchText(value);
    } else if (id === 'imdbId') {
      setImdbId(value);
    } else if (id === 'title') {
      setTitle(value);
    } else if (id === 'director') {
      setDirector(value);
    } else if (id === 'year') {
      setYear(value);
    } else if (id === 'poster') {
      setPoster(value);
    }
  }

  const handleTableSelection = (movie) => {
    if (movie && selectedMovie && movie.imdbId === selectedMovie.imdbId) {
      setSelectedMovie(null)
      setImdbId('')
      setTitle('')
      setDirector('')
      setYear('')
      setPoster('')
    } else {
      setSelectedMovie(movie)
      setImdbId(movie.imdbId)
      setTitle(movie.title)
      setDirector(movie.director)
      setYear(movie.year)
      setPoster(movie.poster)
    }
  }

  const handleSearchMovies = async () => {
    try {
      setIsLoading(true)
      const response = await omdbApi.getMovies(searchText)
      let moviesArr = []
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
        moviesArr.push(movie)
      }
      setMovies(moviesArr)
    } catch (error) {
      handleLogError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateMovie = async () => {
    const movie = { imdbId, title, director, year, poster }
    try {
      await moviesApi.saveMovie(movie, keycloak.token)
      navigate("/home")
    } catch (error) {
      handleLogError(error)
    }
  }

  const isValidForm = () => {
    const imdbIdError = imdbId.trim() === ''
    const titleError = title.trim() === ''
    const directorError = director.trim() === ''
    const yearError = year.trim() === ''

    setImdbIdError(imdbIdError)
    setTitleError(titleError)
    setDirectorError(directorError)
    setYearError(yearError)

    return !(imdbIdError || titleError || directorError || yearError)
  }

  const getContent = () => {
    let stepContent = null
    if (step === 1) {
      stepContent = (
        <SearchStep
          searchText={searchText}
          isLoading={isLoading}
          movies={movies}
          selectedMovie={selectedMovie}
          handleChange={handleChange}
          handleSearchMovies={handleSearchMovies}
          handleTableSelection={handleTableSelection}
        />
      )
    } else if (step === 2) {
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
          handleChange={handleChange}
        />
      )
    } else if (step === 3) {
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
                onClick={handlePreviousStep}>Back</Button>
              <Button.Or />
              <Button
                positive
                disabled={step === 3}
                onClick={handleNextStep}>Next</Button>
            </Button.Group>

            {step === 3 && (
              <>
                <Divider />
                <Button fluid color='blue' onClick={handleCreateMovie}>Create</Button>
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


  return keycloak && keycloak.authenticated && isAdmin(keycloak) ? getContent() : <Navigate to='/' />
}

export default MovieWizard