import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function ConfirmationModal({ modal }) {
  const { isOpen, header, content, onClose, onAction } = modal
  return (
    <Modal size='tiny' open={isOpen} onClose={onClose}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          negative
          icon='thumbs down'
          content='No'
          onClick={() => onAction(false)}
        />
        <Button
          positive
          icon='thumbs up'
          labelPosition='right'
          content='Yes'
          onClick={() => onAction(true)}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ConfirmationModal