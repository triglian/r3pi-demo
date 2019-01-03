import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import _ from 'lodash';
import './UserViewPage.css';
import { ApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router';
import { User } from '../../store/users/types';
import UserDetails from './UserDetails';
import { userFetch } from '../../store/users/thunks';
import { UsersAction } from '../../store/users/actions';

interface PropsFromRedux {
  dispatch: ThunkDispatch<ApplicationState, any, UsersAction>;
}

type RouteParams = {
  userlogin: string;
};

interface PropsFromState {
  user: User | undefined;
}

type allProps = RouteComponentProps<RouteParams> &
  React.Props<RouteParams> &
  PropsFromState &
  PropsFromRedux;

const mapStateToProps = (state: ApplicationState, ownProps: allProps) => ({
  // we search for the user if they are already in the cache
  user: _.find(state.users.data, {
    login: ownProps.match.params.userlogin
  }) as User
});

class UserViewPage extends Component<allProps, ApplicationState> {
  constructor(props: allProps) {
    super(props);
  }

  fetchUser(login: string) {
    this.props.dispatch(userFetch(login));
  }

  componentDidMount() {
    this.fetchUser(this.props.match.params.userlogin)
  }

  render() {
    let content;
    if (this.props.user) {
      content = <UserDetails user={this.props.user} />;
    } else {
      content = <div className="loading-msg">Loading</div>;
    }
    return <div>{content}</div>;
  }
}

export default connect(mapStateToProps)(UserViewPage);
