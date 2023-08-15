import React from 'react'
import { Form, Segment } from 'semantic-ui-react'

function FormStep({ imdbId, title, director, year, poster, imdbIdError, titleError, directorError, yearError, handleChange }) {
  return (
    <Segment>
      <Form>
        <Form.Input
          label='IMDB ID'
          id='imdbId'
          onChange={handleChange}
          value={imdbId}
          error={imdbIdError}
        />
        <Form.Input
          fluid
          label='Title'
          id='title'
          onChange={handleChange}
          value={title}
          error={titleError}
        />
        <Form.Input
          fluid
          label='Director'
          id='director'
          onChange={handleChange}
          value={director}
          error={directorError}
        />
        <Form.Input
          label='Year'
          id='year'
          onChange={handleChange}
          value={year}
          error={yearError}
        />
        <Form.Input
          fluid
          label='Poster'
          id='poster'
          onChange={handleChange}
          value={poster}
        />
      </Form>
    </Segment>
  )
}

export default FormStep
