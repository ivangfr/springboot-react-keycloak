import React from 'react'
import { Form, Segment, Table } from 'semantic-ui-react'

function SearchStep({ search, isLoading, movies, selectedMovie, handleChange, searchMovies, handleTableSelection }) {
  const movieList = movies ? movies.map(movie => {
    const active = movie && selectedMovie && movie.imdbId === selectedMovie.imdbId ? true : false
    return (
      <Table.Row
        key={movie.imdbId}
        active={active}
        onClick={() => handleTableSelection(movie)}
      >
        <Table.Cell>{movie.imdbId}</Table.Cell>
        <Table.Cell>{movie.title}</Table.Cell>
        <Table.Cell>{movie.director}</Table.Cell>
        <Table.Cell>{movie.year}</Table.Cell>
      </Table.Row>
    )
  }) : (
      <Table.Row>
        <Table.Cell></Table.Cell>
      </Table.Row>
    )

  return (
    <Segment loading={isLoading}>
      <Form onSubmit={searchMovies}>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            placeholder='Search for a movie title ...'
            id='search'
            value={search}
            onChange={handleChange}
          />
          <Form.Button primary content='Search' />
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