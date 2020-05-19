import React from 'react'
import { Form, Segment, Table } from 'semantic-ui-react'

function SearchStep({ searchText, isLoading, movies, selectedMovie, handleChange, handleSearchMovies, handleTableSelection }) {
  const movieList = movies ? movies.map(movie => {
    const active = movie && selectedMovie && movie.imdbId === selectedMovie.imdbId ? true : false
    return (
      <Table.Row key={movie.imdbId} active={active} onClick={() => handleTableSelection(movie)}>
        <Table.Cell>{movie.imdbId}</Table.Cell>
        <Table.Cell>{movie.title}</Table.Cell>
        <Table.Cell>{movie.director}</Table.Cell>
        <Table.Cell>{movie.year}</Table.Cell>
      </Table.Row>
    )
  }) : (<Table.Row>
    <Table.Cell></Table.Cell>
  </Table.Row>
    )

  return (
    <Segment loading={isLoading}>
      <Form onSubmit={handleSearchMovies}>
        <Form.Group unstackable>
          <Form.Input
            placeholder='Search for a movie title ...'
            id='searchText'
            value={searchText}
            onChange={handleChange}
            fluid
            width={12}
          />
          <Form.Button
            color='blue'
            content='Search'
            disabled={searchText.trim() === ''}
            fluid
            width={4}
          />
        </Form.Group>
      </Form>

      <Table compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ImdbID</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Director</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {movieList}
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default SearchStep