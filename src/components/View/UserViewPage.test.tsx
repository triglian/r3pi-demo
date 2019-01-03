import React from 'react';
import ReactDOM from 'react-dom';
import UserViewPage from './UserViewPage';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { createShallow } from '@material-ui/core/test-utils';
import { MemoryRouter, withRouter } from 'react-router-dom';

const mockStore = configureStore([thunk]);
const initialState = {
  users: {
    data: []
  }
};
const store = mockStore(initialState);

const UserViewPageWithRouter = withRouter(UserViewPage);

describe('<UserViewPage />', () => {
  describe('render()', () => {
    let shallow: Function;

    beforeEach(() => {
      shallow = createShallow({ untilSelector: 'Button' });
    });

    it('renders without crashing', () => {
      const wrapper = shallow(
        <MemoryRouter>
          <UserViewPageWithRouter user={undefined} dispatch={()=>{}}/>
        </MemoryRouter>,
        { context: { store } }
      );
    });

    it('shows a loading message when there is no user', () => {
      const wrapper = shallow(
        <MemoryRouter>
          <UserViewPageWithRouter user={undefined} dispatch={()=>{}}/>
        </MemoryRouter>,
        { context: { store } }
      );
      expect(wrapper.find('div.loading-msg')).toHaveLength(1);
    });
  });
});
