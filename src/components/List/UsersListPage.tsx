import React, { Component } from 'react';
import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import UsersTable from './UsersTable';
import { usersFetch } from '../../store/users/thunks';
import { ApplicationState } from '../../store';
import { User } from '../../store/users/types';
import { UsersAction } from '../../store/users/actions';
import UsersPagination from './UsersPagination';
import { RouteComponentProps } from 'react-router-dom';
import qs from 'query-string';

interface PropsFromRedux {
  dispatch: ThunkDispatch<ApplicationState, any, UsersAction>;
}

interface PropsFromState {
  users: User[];
  since: string;
  pagePrevUserId: string;
  pageNextUserId: string;
}

const mapStateToProps = (state: ApplicationState) => ({
  users: state.users.data,

  pagePrevUserId: state.users.pagePrevUserId,
  pageNextUserId: state.users.pageNextUserId
});

type allProps = RouteComponentProps & PropsFromState & PropsFromRedux;

class UserListPage extends Component<allProps> {
  private unlisten: Function = () => {};

  constructor(props: allProps) {
    super(props);
  }

  fetchUsers(queryString: string) {
    const since = qs.parse(queryString).since || '';
    this.props.dispatch(usersFetch(since));
  }

  componentDidMount() {
    this.fetchUsers(this.props.location.search);

    this.unlisten = this.props.history.listen((location, action) => {
      // we only care for changes in the /users page
      if (!(location.pathname === '/users' || location.pathname === '/users/'))
        return;
      this.fetchUsers(location.search);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1>React Github Users App</h1>
        </header>
        <UsersTable rows={this.props.users} />
        <UsersPagination
          since={this.props.since}
          pagePrevUserId={this.props.pagePrevUserId}
          pageNextUserId={this.props.pageNextUserId}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserListPage);
