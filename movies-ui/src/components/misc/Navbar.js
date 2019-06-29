import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'
import { withKeycloak } from 'react-keycloak'

class Navbar extends Component {
  state = {
  }

  handleLogInOut = () => {
    const { keycloak } = this.props
    if (keycloak.authenticated) {
      keycloak.logout()
    } else {
      keycloak.login()
    } 
  }

  checkAuthenticated = () => {
    const { keycloak } = this.props
    if (!keycloak.authenticated) {
      this.handleLogInOut()
    }
  }

  render() {
    const { keycloak } = this.props
    const logInOut = keycloak.authenticated ? "Logout" : "Login"
    return (
      <Menu>
        <Container>
          <Menu.Item header>Movies UI</Menu.Item>
          <Menu.Item as={NavLink} exact to="/home">Home</Menu.Item>
          <Menu.Item as={NavLink} exact to="/admin" onClick={this.checkAuthenticated}>Admin</Menu.Item>
          <Menu.Item as={NavLink} exact to="/login" onClick={this.handleLogInOut}>{logInOut}</Menu.Item>
        </Container>
      </Menu >
    )
  }
}

export default withKeycloak(Navbar)