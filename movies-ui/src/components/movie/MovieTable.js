import React from 'react'
import { Table, Button, Image } from 'semantic-ui-react'

function MovieTable({ movies, deleteMovie, editMovie }) {
  const movieList = movies && movies.map(movie => {
    return (
      <Table.Row key={movie.imdbId}>
        <Table.Cell collapsing>
          <Button
            circular
            color='red'
            size='small'
            icon='trash'
            onClick={() => deleteMovie(movie.imdbId)}
          />
          <Button
            circular
            color='orange'
            size='small'
            icon='edit'
            onClick={() => editMovie(movie)}
          />
        </Table.Cell>
        <Table.Cell>{movie.imdbId}</Table.Cell>
        <Table.Cell>{movie.title}</Table.Cell>
        <Table.Cell>{movie.director}</Table.Cell>
        <Table.Cell>{movie.year}</Table.Cell>
        <Table.Cell>
          <Image src={movie.poster} rounded size='tiny' />
        </Table.Cell>
      </Table.Row>
    )
  })

  return (
    <Table compact striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>ImdbID</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Director</Table.HeaderCell>
          <Table.HeaderCell>Year</Table.HeaderCell>
          <Table.HeaderCell>Poster</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {movieList}
      </Table.Body>
    </Table>
  )
}

export default MovieTable