import React from 'react'
import { Button, Form } from 'semantic-ui-react'

function MoviesForm({ form, handleChange, handleSaveMovie, clearForm }) {
  return (
    <Form>
      <Form.Input
        fluid
        label='ImdbID *'
        id='imdbId'
        onChange={handleChange}
        value={form.imdbId}
        error={form.imdbIdError}
      />
      <Form.Input
        fluid
        label='Title *'
        id='title'
        onChange={handleChange}
        value={form.title}
        error={form.titleError}
      />
      <Form.Input
        fluid
        label='Director *'
        id='director'
        onChange={handleChange}
        value={form.director}
        error={form.directorError}
      />
      <Form.Input
        fluid
        label='Year *'
        id='year'
        onChange={handleChange}
        value={form.year}
        error={form.yearError}
      />
      <Form.Input
        fluid
        label='Poster'
        id='poster'
        onChange={handleChange}
        value={form.poster}
      />
      <Button.Group fluid>
        <Button onClick={clearForm}>Cancel</Button>
        <Button.Or />
        <Button positive onClick={handleSaveMovie}>Save</Button>
      </Button.Group>
    </Form>
  )
}

export default MoviesForm