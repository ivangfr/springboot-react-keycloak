import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function MovieCard({ movie, link }) {
  const content = (
    <>
      <Image src={movie.poster ? movie.poster : '/images/movie-poster.jpg'} wrapped ui={false} />
      <Card.Content textAlign="center">
        <Card.Header>{movie.title}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>imdbID: <strong>{movie.imdbId}</strong></Card.Description>
        <Card.Description>Author: <strong>{movie.director}</strong></Card.Description>
        <Card.Description>Year: <strong>{movie.year}</strong></Card.Description>
      </Card.Content>
    </>
  )
  return (
    !link ? <Card>{content}</Card> : <Card as={Link} to={`/movies/${movie.imdbId}`}>{content}</Card>
  )
}

export default MovieCard