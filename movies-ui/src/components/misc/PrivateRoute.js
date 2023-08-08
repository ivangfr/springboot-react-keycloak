import React from 'react'
import { useKeycloak } from '@react-keycloak/web'

function PrivateRoute({ children }) {
  const { keycloak } = useKeycloak()

  const Login = () => {
    keycloak.login()
  }

  return keycloak.authenticated ? children : <Login />
}

export default PrivateRoute