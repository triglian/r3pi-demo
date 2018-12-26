import { ActionType, action } from 'typesafe-actions';
import { UsersActionTypes, User } from './types';
import { AnyAction } from 'redux';

export const fetchRequest = () => action(UsersActionTypes.FETCH_REQUEST);
export type FetchRequestAction = ActionType<typeof fetchRequest>;

export const fetchSuccess = (data: User[]) =>
  action(UsersActionTypes.FETCH_SUCCESS, data);
export type FetchSuccessAction = ActionType<typeof fetchSuccess>;

export const fetchError = (message: string) =>
  action(UsersActionTypes.FETCH_ERROR, message);

const userActions = {
  fetchRequest,
  fetchSuccess,
  fetchError
}

export type UsersAction = ActionType<typeof userActions>;


