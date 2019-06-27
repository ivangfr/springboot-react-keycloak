import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'

function Navbar() {
  return (
    <Menu>
      <Container>
        <Menu.Item header>Movies UI</Menu.Item>
        <Menu.Item as={NavLink} exact to="/home">Home</Menu.Item>
        <Menu.Item as={NavLink} exact to="/admin">Admin</Menu.Item>
      </Container>
    </Menu>
  )
}

export default Navbar