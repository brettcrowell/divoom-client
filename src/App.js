import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import Client from './Client';
import Generate from './Generate';
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/generate" component={Generate}/>
          <Route path="/" component={Client}/>
        </Switch>
      </BrowserRouter>
    )
  }

}

export default App;
