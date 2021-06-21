import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import Book from './components/Book/Book';
import Login from './components/Forms/Login';
import Signup from './components/Forms/Signup';
import Look from './components/Look/Look';
import Pick from './components/Pick/Pick';
import FoF from './components/404';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/mode" component={Pick} />
        <Route path="/rooms" component={Book} />
        <Route path="/look/:id" component={Look} />
        <Route path="/look" component={Look} />
        <Route component={FoF} />
      </Switch>
    );
  }

}

export default Routes;
