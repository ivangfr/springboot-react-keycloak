import React from 'react'
import { KeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/misc/Navbar'
import PrivateRoute from './components/misc/PrivateRoute'
import Movie from './components/movie/Movie'
import MovieWizard from './components/wizard/MovieWizard'

function App() {
  const keycloak = new Keycloak('keycloak.json')
  const initConfig = { pkceMethod: 'S256' }

  return (
    <KeycloakProvider keycloak={keycloak} initConfig={initConfig}>
      <Router>
        <Navbar />
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={Home} />
        <PrivateRoute path='/movies' exact component={Movie} />
        <PrivateRoute path='/wizard' exact component={MovieWizard} />
      </Router>
    </KeycloakProvider>
  )
}

export default App