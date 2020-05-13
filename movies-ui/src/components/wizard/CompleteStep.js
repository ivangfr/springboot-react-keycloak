import React from 'react'
import { Form, Segment } from 'semantic-ui-react'
import MovieCard from '../home/MovieCard'

function CompleteStep({ movie, createMovie }) {
  return (
    <Segment compact>
      <MovieCard movie={movie} />
      <Form>
        <Form.Button fluid primary onClick={() => createMovie(movie)}>Create</Form.Button>
      </Form>
    </Segment>
  )
}

export default CompleteStep