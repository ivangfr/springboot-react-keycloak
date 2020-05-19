import React from 'react'
import { Button, Image, Table } from 'semantic-ui-react'

function MoviesTable({ movies, handleDeleteMovie, handleEditMovie }) {
  const height = window.innerHeight - 100
  const style = {
    height: height,
    maxHeight: height,
    overflowY: 'auto',
    overflowX: 'hidden'
  }

  const movieList = movies && movies.map(movie => {
    return (
      <Table.Row key={movie.imdbId}>
        <Table.Cell collapsing>
          <Button
            circular
            color='red'
            size='small'
            icon='trash'
            onClick={() => handleDeleteMovie(movie)}
          />
          <Button
            circular
            color='orange'
            size='small'
            icon='edit'
            onClick={() => handleEditMovie(movie)}
          />
        </Table.Cell>
        <Table.Cell>{movie.imdbId}</Table.Cell>
        <Table.Cell>{movie.title}</Table.Cell>
        <Table.Cell>{movie.director}</Table.Cell>
        <Table.Cell>{movie.year}</Table.Cell>
        <Table.Cell>
          <Image size='tiny' src={movie.poster ? movie.poster : '/images/movie-poster.jpg'} rounded />
        </Table.Cell>
      </Table.Row>
    )
  })

  return (
    <div style={style}>
      <Table compact striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}/>
            <Table.HeaderCell width={2}>ImdbID</Table.HeaderCell>
            <Table.HeaderCell width={4}>Title</Table.HeaderCell>
            <Table.HeaderCell width={3}>Director</Table.HeaderCell>
            <Table.HeaderCell width={2}>Year</Table.HeaderCell>
            <Table.HeaderCell width={3}>Poster</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {movieList}
        </Table.Body>
      </Table>
    </div>
  )
}

export default MoviesTable