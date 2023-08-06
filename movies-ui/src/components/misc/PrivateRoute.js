import React from 'react'
import { useKeycloak } from '@react-keycloak/web'
import { Route } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  const { keycloak } = useKeycloak()

  const Login = () => {
    keycloak.login()
  }

  return (
    <Route
      {...rest}
      render={props => (
        keycloak?.authenticated ? <Component {...props} /> : <Login />
      )}
    />
  )
}

export default PrivateRoute