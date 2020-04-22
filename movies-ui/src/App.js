import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { KeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import Navbar from './components/misc/Navbar'
import Home from './components/home/Home'
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
        <Route path='/movies' exact component={Movie} />
        <Route path='/wizard' exact component={MovieWizard} />
      </Router>
    </KeycloakProvider>
  )
}

export default App