import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieContainer from '../MovieContainer/MovieContainer';
import FavoriteContainer from '../FavoriteContainer/FavoriteContainer'
import Login from '../Login/Login';

export const Main = ({loginStatus}) => (
  <Switch>
    <Route 
      exact path="/"
      component={MovieContainer} 
    />
    <Route 
      path="/favorites"
      render={() => (loginStatus ? <FavoriteContainer /> : <Login />)}
    />
    <Route 
      path="/login" 
      render={() => (loginStatus ? <Redirect to="/"/> : <Login />)} 
    />
  </Switch>
)

export const mapStateToProps = (state) => ({
  loginStatus: state.activeUser
});

export default withRouter(connect(mapStateToProps)(Main));