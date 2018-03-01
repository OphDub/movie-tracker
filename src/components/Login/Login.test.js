/* eslint-disable */
import React from 'react';
import { Login, mapStateToProps, mapDispatchToProps } from './Login';
import { shallow } from 'enzyme';
import { userData, cleanMovieArray } from '../../mock-data.js';

describe('Login', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow(
      <Login
        activeUser={userData}
      />);
  });

  it('should match the snapshot test', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handleChange should update state when it is called', () => {
    const mockEvent = { target: {name: 'name' ,value: 'brophus park'}};

    wrapper.instance().handleChange(mockEvent);
    wrapper.update();

    expect(wrapper.state().name).toEqual(mockEvent.target.value);
  });

  it('should call getAllFavorites from api and addFavorite when getFavorites is called', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          response: {results: cleanMovieArray}
        });
      });
    });

    expect(wrapper.instance().getFavorites(userData)).resolves.toEqual(cleanMovieArray)
  });

  describe('mapStateToProps and mapDispatchToProps for Login', () => {
    it('should map the store correctly', () => {
      const mockUser = { id: 4, name: 'bruce', password: 'pass' };
      const mockStore = {
        activeUser: mockUser
      };

      const mapped = mapStateToProps(mockStore);

      expect(mapped.activeUser).toEqual(mockStore.activeUser);
    });

    it('should call the dispatch func when sendFavorite is called', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);

      mapped.handleLogin();

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});