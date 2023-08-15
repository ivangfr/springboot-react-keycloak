import React from 'react'
import { Header, Form, Dimmer, Divider } from 'semantic-ui-react'

function MovieCommentForm({ authenticated, commentText, handleAddComment, handleChange }) {
  return (
    <>
      <Header>Add a comment</Header>
      <Divider />
      <Dimmer.Dimmable dimmed={!authenticated}>
        <Form onSubmit={handleAddComment}>
          <Form.Group inline>
            <Form.Input
              id='commentText'
              value={commentText}
              placeholder='Tell us more about ...'
              style={{ resize: 'none' }}
              onChange={handleChange}
              fluid
              width={13}
            />
            <Form.Button
              content='Submit'
              disabled={commentText.trim() === ''}
              color='blue'
              fluid
              width={3}
            />
          </Form.Group>
        </Form>

        <Dimmer active={!authenticated}>
          <Header inverted>To add a comment you must be logged in</Header>
        </Dimmer>
      </Dimmer.Dimmable>
    </>
  )
}

export default MovieCommentForm