import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/misc/Navbar'
import Home from './components/home/Home'
import Admin from './components/admin/Admin'

function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/' exact component={Home} />
      <Route path='/home' exact component={Home} />
      <Route path='/admin' exact component={Admin} />
    </Router>
  );
}

export default App;