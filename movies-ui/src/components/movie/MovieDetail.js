import React, { useEffect, useState } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { handleLogError } from '../misc/Helpers'
import { moviesApi } from '../misc/MoviesApi'
import MovieCard from '../home/MovieCard'
import MovieComments from './MovieComments'
import MovieCommentForm from './MovieCommentForm'
import { useParams } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

function MovieDetail() {
  const [authenticated, setAuthenticated] = useState(false)
  const [movie, setMovie] = useState(null)
  const [commentText, setCommentText] = useState('')
  
  const { keycloak } = useKeycloak()
  const { id } = useParams()

  useEffect(() => {
    const imdbId = id
    setAuthenticated(keycloak.authenticated)

    const fetchMovie = async () => {
      try {
        const response = await moviesApi.getMovie(imdbId)
        const movie = response.data
        setMovie(movie)
      } catch (error) {
        handleLogError(error)
      }
    }
    fetchMovie()
  }, [id, keycloak.authenticated])

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'commentText') {
      setCommentText(value)
    }
  }

  const handleAddComment = async () => {
    if (!commentText) {
      return
    }

    const comment = { text: commentText }
    try {
      const response = await moviesApi.addMovieComment(movie.imdbId, comment, keycloak.token)
      const updatedMovie = response.data

      setMovie(updatedMovie)
      setCommentText('')
    } catch (error) {
      handleLogError(error)
    }
  }

  return (
    !movie ? <></> : (
      <Container>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <MovieCard movie={movie} link={false} />
            </Grid.Column>
            <Grid.Column width={11}>
              <MovieCommentForm
                authenticated={authenticated}
                commentText={commentText}
                handleAddComment={handleAddComment}
                handleChange={handleChange}
              />
              <MovieComments comments={movie.comments} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  )
}

export default MovieDetail