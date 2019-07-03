import React from 'react'
import { Card, Image } from 'semantic-ui-react'

function MovieCard({ movie }) {
  return (
    <Card>
      <Image src={movie.poster} wrapped ui={false} />
      <Card.Content textAlign="center">
        <Card.Header>{movie.title}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>imdbID: <strong>{movie.imdbId}</strong></Card.Description>
        <Card.Description>Author: <strong>{movie.director}</strong></Card.Description>
        <Card.Description>Year: <strong>{movie.year}</strong></Card.Description>
      </Card.Content>
    </Card>
  )
}

export default MovieCard