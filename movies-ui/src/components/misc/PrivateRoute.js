import React from 'react'
import { withKeycloak } from '@react-keycloak/web'
import { Route } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  return rest.keycloakInitialized && <Route {...rest} render={props => (
    rest.keycloak.authenticated ? <Component {...props} /> : rest.keycloak.login()
  )} />
}

export default withKeycloak(PrivateRoute)