import { Reducer } from 'redux';
import { UsersState, UsersActionTypes, User } from './types';

export const initialState: UsersState = {
  data: [],
  loading: false,
  error: undefined,
  pagePrevUserId: '',
  pageNextUserId: ''
};


function updateOrAddUser(users: User[] , newUser: User){
  const idx = users.findIndex(user => user.login === newUser.login )

  if (idx !== -1){
    return [
      ...users.slice(0, idx),
      newUser,
      ...users.slice(0, idx + 1)
    ];
  }

  return [...users, newUser];
}


const reducer: Reducer<UsersState> = (state = initialState, action) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS_REQUEST: {
      return { ...state, loading: true };
    }
    case UsersActionTypes.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.users,
        pagePrevUserId: action.payload.pagePrevUserId,
        pageNextUserId: action.payload.pageNextUserId
      };
    }
    case UsersActionTypes.FETCH_USERS_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case UsersActionTypes.FETCH_USER_REQUEST: {
      return { ...state, loading: true };
    }
    case UsersActionTypes.FETCH_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: updateOrAddUser(state.data, action.payload),
      };
    }
    case UsersActionTypes.FETCH_USER_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as usersReducer };
