import React, { Component } from 'react'
import { withKeycloak } from '@react-keycloak/web'
import { NavLink, withRouter } from 'react-router-dom'
import { Container, Dropdown, Menu } from 'semantic-ui-react'

class Navbar extends Component {

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
    const adminMenuVisibility = keycloak.authenticated ? { "display": "block" } : { "display": "none" }
    return (
      <Menu>
        <Container>
          <Menu.Item header>Movies UI</Menu.Item>
          <Menu.Item as={NavLink} exact to="/home">Home</Menu.Item>
          <Dropdown item text='Admin' style={adminMenuVisibility}>
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