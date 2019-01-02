import { Dispatch, ActionCreator } from 'redux';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserError,
  UsersAction,
  noOp
} from './actions';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '..';
import {
  IGithubAPIUsersResponse,
  callGithubApiUsers,
  callGithubApiUser
} from '../../utils/callGithubApi';
import { User } from './types';

// To if we have the full info on a user, we check if the `name` property
// exists which is one of the properties that we get
// when query for the full info of a user
function existsFullUser(users: User[], login: string): boolean {
  const user = users.find(u => u.login === login && u.hasOwnProperty('name'));
  return !(user === undefined);
}

export const usersFetch: ActionCreator<
  ThunkAction<Promise<UsersAction>, ApplicationState, void, UsersAction>
> = (since: string) => {
  return async (dispatch: Dispatch): Promise<UsersAction> => {
    try {
      dispatch(fetchUsersRequest());

      const response: IGithubAPIUsersResponse = await callGithubApiUsers(since);
      return dispatch(fetchUsersSuccess(response));
    } catch (err) {
      return dispatch(fetchUsersError(err.message));
    }
  };
};

export const userFetch: ActionCreator<
  ThunkAction<Promise<UsersAction>, ApplicationState, void, UsersAction>
> = (login: string) => {
  return async (dispatch: Dispatch, getState): Promise<UsersAction> => {
    try {
      // check if the user exists with their full info before fetching them.
      const users: User[] = getState().users.data;

      if (existsFullUser(users, login)) {
        return dispatch(noOp());
      }

      dispatch(fetchUserRequest());

      const response: User = await callGithubApiUser(login);
      return dispatch(fetchUserSuccess(response));
    } catch (err) {
      return dispatch(fetchUserError(err.message));
    }
  };
};
