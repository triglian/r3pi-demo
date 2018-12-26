import { combineReducers } from 'redux';
import { UsersState } from './users/types';
import { initialState as usersInitialState, usersReducer } from './users/reducer';


export interface ApplicationState {
  users: UsersState;
}

export const initialState = {
  users: usersInitialState
}

export const rootReducer = combineReducers<ApplicationState>({
  users: usersReducer
});
