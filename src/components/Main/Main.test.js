/* eslint-disable */
import React from 'react';
import { Main, mapStateToProps } from './Main';
import { shallow } from 'enzyme';
import { userData } from '../../mock-data.js';

describe('Main', () => {
  let wrapper;
  
  beforeEach( () => {
    wrapper = shallow(
      <Main
        activeUser={userData}
      />);
  });

  it('should match the snapshot test', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps for Main', () => {
    it('should map the store correctly', () => {
      const mockUser = { id: 4, name: 'bruce', password: 'pass' };
      const mockStore = {
        activeUser: mockUser
      };

      const mapped = mapStateToProps(mockStore);

      expect(mapped.loginStatus).toEqual(mockStore.activeUser);
    });
  });
});