import React from 'react'
import { Card } from 'semantic-ui-react'
import MovieCard from '../home/MovieCard'

function CompleteStep({ movie }) {
  return (
    <Card.Group doubling centered>
      <MovieCard movie={movie} link={false} />
    </Card.Group>
  )
}

export default CompleteStep