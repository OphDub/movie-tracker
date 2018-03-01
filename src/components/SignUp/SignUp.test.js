/* eslint-disable */
import React from 'react';
import { SignUp, mapDispatchToProps } from './SignUp';
import { shallow } from 'enzyme';
import { userData } from '../../mock-data.js';

describe('SignUp', () => {
  let wrapper;

  beforeEach( () => {
    const mockFn = jest.fn();

    wrapper = shallow(
      <SignUp handleLogin={mockFn}/>);
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

  it('emailTaken should update state to match the value it is given', () => {
    const truthyValue = true;
    const falsyValue = false;

    wrapper.instance().emailTaken(truthyValue);
    wrapper.update();

    expect(wrapper.state().errorStatus).toEqual(true);

    wrapper.instance().emailTaken(falsyValue);
    wrapper.update();

    expect(wrapper.state().errorStatus).toEqual(false);
  });

  describe('mapDispatchToProps for SignUp', () => {
    it('should call the dispatch func when sendFavorite is called', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);

      mapped.handleLogin();

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});