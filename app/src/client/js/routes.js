import React, {Component} from 'react';
import Index from './containers/Index'
import About from './containers/About'
import Press from './containers/Press'
import NoMatch from './containers/NoMatch'
import Home from './containers/Home'
import { Route, IndexRoute } from 'react-router'

const routes = (
  <Route path="/" component={Index}>
    <IndexRoute component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/press" component={Press}/>
    <Route path="*" component={NoMatch}/>
  </Route>
);

export default routes;
