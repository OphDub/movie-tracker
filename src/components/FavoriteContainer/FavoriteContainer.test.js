/* eslint-disable */
import React from 'react';
import { FavoriteContainer, mapStateToProps, mapDispatchToProps } from './FavoriteContainer';
import { shallow, mount } from 'enzyme';
import { cleanMovieArray, userData, oneMovie } from '../../mock-data.js';

describe('FavoriteContainer', () => {
  let wrapper;
  const mockFunction = jest.fn();

  beforeEach( () => {
    wrapper = shallow(
      <FavoriteContainer
        favoriteArray={cleanMovieArray}
        activeUser={userData}
        toggleFavorite={mockFunction}
        sendFavorite={mockFunction}
      />);
  });

  it('should match the snapshot test', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call toggleFavorite when handleFavorite is called', () => {
    wrapper.instance().handleFavorite(oneMovie)
    wrapper.update()

    expect(mockFunction).toHaveBeenCalled()
  });

  describe('mapStateToProps and mapDispatchToProps for FavoriteContainer', () => {
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

      mapped.sendFavorite();

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});

