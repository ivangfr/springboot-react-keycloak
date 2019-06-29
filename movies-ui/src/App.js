import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { KeycloakProvider } from 'react-keycloak'
import Keycloak from 'keycloak-js'
import Navbar from './components/misc/Navbar'
import Home from './components/home/Home'
import Admin from './components/admin/Admin'

const keycloak = Keycloak('/keycloak.json', { onLoad: 'login-required', promiseType: 'native' })

function App() {
  return (
    <KeycloakProvider keycloak={keycloak}>
      <Router>
        <Navbar />
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={Home} />
        <Route path='/admin' exact component={Admin} />
      </Router>
    </KeycloakProvider>
  )
}

export default App