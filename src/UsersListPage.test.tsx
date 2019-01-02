import React from 'react';
import ReactDOM from 'react-dom';
import UsersListPage from './UsersListPage';
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

const UsersListPageWithRouter = withRouter(UsersListPage);

describe('<UsersListPage />', () => {
  describe('render()', () => {
    let shallow: Function;

    beforeEach(() => {
      shallow = createShallow({ untilSelector: 'Button' });
    });

    it('renders without crashing', () => {
      const wrapper = shallow(
        <MemoryRouter>
          <UsersListPageWithRouter />
        </MemoryRouter>,
        { context: { store } }
      );
    });

    it('has the right child nodes', () => {
      const wrapper = shallow(
        <MemoryRouter>
          <UsersListPageWithRouter />
        </MemoryRouter>,
        { context: { store } }
      );
      expect(wrapper.find('header')).toHaveLength(1);
      expect(wrapper.find('WithStyles(UsersTable)')).toHaveLength(1);
    });
  });
});
