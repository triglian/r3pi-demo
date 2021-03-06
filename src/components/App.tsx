import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UsersListPage from './List/UsersListPage';
import UserViewPage from './View/UserViewPage';

import NotFoundPage from '../NotFoundPage';
import './App.css';

interface IAppProps {
  classes: any;
}

class App extends Component {
  private classes: any;

  constructor(props: IAppProps) {
    super(props);
    this.classes = props.classes;
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={UsersListPage} />
          <Route exact path="/users/" component={UsersListPage} />
          <Route exact path="/users/:userlogin" component={UserViewPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
