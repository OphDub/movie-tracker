import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cleanMovieData } from '../../cleaner';
import { apiMovieData } from '../../api';
import { addMovieData } from '../../actions/actionIndex';
import './App.css';
import PropTypes from 'prop-types';


//components:
import Header from '../Header/Header';
import Main from '../Main/Main';

export class App extends Component {
  async componentDidMount() {
    const movies = await this.getInitialData();

    await this.props.getMovieData(movies);
  }

  getInitialData = async () => {
    const movieData = await apiMovieData();
    const cleanData = await cleanMovieData(movieData);

    return cleanData;
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
 loginStatus: state.activeUser
});

export const mapDispatchToProps = (dispatch) => ({
 getMovieData: (data) => dispatch(addMovieData(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  getMovieData: PropTypes.func,
}