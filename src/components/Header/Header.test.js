/* eslint-disable */
import React from 'react';
import { Header, mapStateToProps, mapDispatchToProps } from './Header';
import { shallow } from 'enzyme';
import { userData } from '../../mock-data.js';

describe('Header', () => {
  let wrapper;
  
  beforeEach( () => {
    wrapper = shallow(
      <Header activeUser={userData} />);
  });

  it('should match the snapshot test', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps and mapDispatchToProps for Header', () => {
    it('should map the store correctly', () => {
      const mockUser = { id: 4, name: 'bruce', password: 'pass' };
      const mockStore = {
        activeUser: mockUser
      };

      const mapped = mapStateToProps(mockStore);

      expect(mapped.loginStatus).toEqual(mockStore.activeUser);
    });

    it('should call the dispatch func when sendFavorite is called', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);

      mapped.logoutUser();

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});