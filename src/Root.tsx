import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {ApplicationState} from './store';
import App from './App';

interface OwnProps{
  store: Store<ApplicationState>
}

const Root = (props: OwnProps) => (
  <Provider store={props.store}>
    <Router basename={process.env.PUBLIC_URL}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

export default Root;
