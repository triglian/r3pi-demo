import { Dispatch, ActionCreator } from 'redux';
import { fetchRequest, fetchSuccess, fetchError, UsersAction } from './actions';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '..';
import { User } from './types';

import parse from 'parse-link-header';

export const itemsFetchUsers: ActionCreator<
  ThunkAction<Promise<UsersAction>, ApplicationState, void, UsersAction>
> = () => {
  return async (dispatch: Dispatch): Promise<UsersAction> => {
    try{
        dispatch(fetchRequest());
        const response = await fetch('https://api.github.com/users');
        if (!response.ok) {
          throw Error(response.statusText);
        }
        // const linkHeader = response.headers.get('link') || '';
        // const parseResults = parse(linkHeader);
        // console.log(parseResults)

        const users: User[] =  await response.json();
        return dispatch(fetchSuccess(users));
    }catch(err){
        return dispatch(fetchError(err.message));
    }
  };
};
