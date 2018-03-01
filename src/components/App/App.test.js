/* eslint-disable */
import React from 'react';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { shallow } from 'enzyme';
import { cleanMovieArray, userData } from '../../mock-data.js';

describe('App', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow( <App loginStatus={userData}/> );
  });

  it('should match the snapshot test', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should fetch moviedata when getInitalData is called on load', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(data)
    }))

    wrapper.instance().getInitialData()
    wrapper.update()

    expect(window.fetch).toHaveBeenCalled()
  });

  describe('mapStateToProps and mapDispatchToProps for App', () => {
    it('should be able to map the store correctly', () => {
      const mockUser = { id: 4, name: 'bruce', password: 'pass' };
      const mockStore = {
        loginStatus: mockUser
      };

      const mapped = mapStateToProps(mockStore);

      expect(mapped.loginStatus).toEqual(mockStore.user);
    });

    it('should call the dispatch func when getMovieData is called', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);

      mapped.getMovieData();

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});