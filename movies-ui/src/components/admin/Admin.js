import React, { Component } from 'react'
// import { Container } from 'semantic-ui-react'
import Keycloak from 'keycloak-js';

class Admin extends Component {
  state = {
    keycloak: null,
    authenticated: false
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json')
    keycloak.init({ onLoad: 'login-required', promiseType: 'native' })
      .then(authenticated => {
        this.setState({ keycloak: keycloak, authenticated: authenticated })
      })
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <div>
          <p>This is a Keycloak-secured component of your application. You shouldn't be able
          to see this unless you've authenticated with Keycloak.</p>
          <p>{this.state.keycloak.token}</p>
        </div>
      )
      else return (
        <div>Unable to authenticate!</div>
      )
    }
    return (
      <div>Initializing Keycloak...</div>
    )
  }
}

export default Admin