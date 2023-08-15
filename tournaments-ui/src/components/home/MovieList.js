import React from 'react'
import { Card, Header, Segment } from 'semantic-ui-react'
import MovieCard from './MovieCard'

function MovieList({ movies }) {
  const movieList = movies.map(movie => <MovieCard key={movie.imdbId} movie={movie} link={true} />)

  return (
    movies.length > 0 ? (
      <Card.Group doubling centered>
        {movieList}
      </Card.Group >
    ) : (
        <Segment padded color='blue'>
          <Header textAlign='center' as='h4'>No movies</Header>
        </Segment>
      )
  )
}

export default MovieList