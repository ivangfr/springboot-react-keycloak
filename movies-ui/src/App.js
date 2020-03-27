import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { KeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import Navbar from './components/misc/Navbar'
import Home from './components/home/Home'
import Movie from './components/movie/Movie'
import MovieWizard from './components/wizard/MovieWizard'

const keycloak = Keycloak('/keycloak.json', { onLoad: 'login-required', promiseType: 'native' })

function App() {
  return (
    <KeycloakProvider keycloak={keycloak}>
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