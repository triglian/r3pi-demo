import React, { Component } from 'react';
import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import UsersTable from './UsersTable';
import { itemsFetchUsers } from './store/users/thunks';
import { ApplicationState } from './store';
import { User } from './store/users/types';
import { UsersAction } from './store/users/actions';

interface PropsFromRedux {
  dispatch: ThunkDispatch<ApplicationState, any, UsersAction>;
}

interface PropsFromState {
  users: User[];
}

const mapStateToProps = (state: ApplicationState) => ({
  users: state.users.data
});

type allProps = PropsFromState & PropsFromRedux;

class UserListPage extends Component<allProps> {
  constructor(props: allProps) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(itemsFetchUsers());
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1>React Github Users App</h1>
        </header>
        <UsersTable rows={this.props.users} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserListPage);
