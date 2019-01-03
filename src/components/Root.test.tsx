import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Root from './Root';
import configureStore from 'redux-mock-store';
import { initialState, ApplicationState } from '../store';
import { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import createMockStore from 'redux-mock-store';

const mockStoreCreator: MockStoreCreator<
  ApplicationState,
  void
> = createMockStore<ApplicationState, void>();
const store: MockStoreEnhanced<ApplicationState, void> = mockStoreCreator(
  initialState
);

describe('<Root />', () => {
  describe('render()', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(<Root store={store} />);
    });

    it('has the right child nodes', () => {
      const wrapper = shallow(<Root store={store} />);
      expect(wrapper.find('Provider')).toHaveLength(1);
      expect(wrapper.find('BrowserRouter')).toHaveLength(1);
      expect(wrapper.find('Route')).toHaveLength(1);
    });
  });
});
