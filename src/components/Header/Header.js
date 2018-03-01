import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/actionIndex';
import PropTypes from 'prop-types';
import './Header.css'

export const Header = ({loginStatus, logoutUser}) => {
  const signOut = async () => {
    await logoutUser(false);
  }

  return(
    <header>
    <div className="nav-container">
      <NavLink className="nav" to="/login">Login/Sign-up</NavLink>
    </div>
      <NavLink to="/"><h1>Movie Tracker</h1></NavLink>
      {
        loginStatus &&
        <div className="signed-in">
          <NavLink to="/favorites"><button>Show Favorites</button></NavLink>
          <span className="welcome">Welcome, {loginStatus.name}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      }
    </header>
  )
}

export const mapStateToProps = (state) => ({
  loginStatus: state.activeUser,
});

export const mapDispatchToProps = (dispatch) => ({
  logoutUser: (login) => dispatch(logoutUser(login)),
});

Header.propTypes = {
  logoutUser: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);