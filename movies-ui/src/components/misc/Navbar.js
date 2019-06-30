import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Container, Dropdown } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { withKeycloak } from 'react-keycloak'

class Navbar extends Component {
  state = {
  }

  handleLogInOut = () => {
    const { keycloak, history } = this.props
    if (keycloak.authenticated) {
      history.push('/')
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
          <Dropdown item text='Admin'>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} exact to="/movies" onClick={this.checkAuthenticated}>Movies</Dropdown.Item>
              <Dropdown.Item as={NavLink} exact to="/wizard" onClick={this.checkAuthenticated}>Movie Wizard</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item as={NavLink} exact to="/login" onClick={this.handleLogInOut}>{logInOut}</Menu.Item>
        </Container>
      </Menu >
    )
  }
}

export default withRouter(withKeycloak(Navbar))