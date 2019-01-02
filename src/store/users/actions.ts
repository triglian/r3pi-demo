import { ActionType, action } from 'typesafe-actions';
import { UsersActionTypes, User } from './types';
import {IGithubAPIUsersResponse} from '../../utils/callGithubApi';
import { AnyAction } from 'redux';

export const fetchUsersRequest = () => action(UsersActionTypes.FETCH_USERS_REQUEST);
export type FetchUsersRequestAction = ActionType<typeof fetchUsersRequest>;

export const fetchUsersSuccess = (data: IGithubAPIUsersResponse) =>
  action(UsersActionTypes.FETCH_USERS_SUCCESS, data);
export type FetchUsersSuccessAction = ActionType<typeof fetchUsersSuccess>;

export const fetchUsersError = (message: string) =>
  action(UsersActionTypes.FETCH_USERS_ERROR, message);

export const fetchUserRequest = () => action(UsersActionTypes.FETCH_USER_REQUEST);
export type FetchRequestAction = ActionType<typeof fetchUserRequest>;

export const fetchUserSuccess = (data: User) =>
  action(UsersActionTypes.FETCH_USER_SUCCESS, data);
export type FetchSuccessAction = ActionType<typeof fetchUserSuccess>;

export const fetchUserError = (message: string) =>
  action(UsersActionTypes.FETCH_USER_ERROR, message);

export const noOp = () => action(UsersActionTypes.NO_OP);
export type NoOpAction = ActionType<typeof noOp>;


const userActions = {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserError,
  noOp
}

export type UsersAction = ActionType<typeof userActions>;


