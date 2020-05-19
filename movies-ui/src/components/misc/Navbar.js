import React, { Component } from 'react'
import { withKeycloak } from '@react-keycloak/web'
import { NavLink, withRouter } from 'react-router-dom'
import { Container, Dropdown, Menu } from 'semantic-ui-react'
import { isAdmin } from '../misc/Helpers'

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

  getUsername = (keycloak) => {
    return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
  }

  getAdminMenuStyle = (keycloak) => {
    return keycloak.authenticated && isAdmin(keycloak) ? { "display": "block" } : { "display": "none" }
  }

  render() {
    const { keycloak } = this.props
    const logInOut = keycloak.authenticated ? "Logout" : "Login"
    const adminMenuVisibility = this.getAdminMenuStyle(keycloak)

    return (
      <Menu stackable>
        <Container>
          <Menu.Item header>Movies UI</Menu.Item>
          <Menu.Item as={NavLink} exact to="/home">Home</Menu.Item>
          <Dropdown item text='Admin' style={adminMenuVisibility}>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} exact to="/movies" onClick={this.checkAuthenticated}>Movies</Dropdown.Item>
              <Dropdown.Item as={NavLink} exact to="/wizard" onClick={this.checkAuthenticated}>Movie Wizard</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position='right'>
            {keycloak.authenticated &&
              <Dropdown text={`Hi ${this.getUsername(keycloak)}`} pointing className='link item'>
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/settings">Settings</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            }
            <Menu.Item as={NavLink} exact to="/login" onClick={this.handleLogInOut}>{logInOut}</Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu >
    )
  }
}

export default withRouter(withKeycloak(Navbar))