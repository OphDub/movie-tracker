import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFavorite, getAllFavorites, deleteFavorite } from '../../api';
import { addFavoriteAction } from '../../actions/actionIndex';
import './MovieContainer.css';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

export class MovieContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  cardsArray = () => {
    const { movieArray, favoriteArray } = this.props
    const allMovies = movieArray.map(movie => {
      const allId = favoriteArray.map(movie => movie.movie_id)
      const favorite = allId.includes(movie.movie_id) ? 'favorited' : ''

      return (
        <Card
          addClass={favorite}
          movie={movie}
          id={movie.movie_id}
          key={movie.movie_id}
          handleFavorite={this.handleFavorite}
        />
      )
    })

    return allMovies
  }

  handleFavorite = async (movie) => {
    if (this.props.activeUser) {
      this.toggleFavorite(movie)
    } else {
      this.props.history.push('login')
    }
  }

  toggleFavorite = async (movie) => {
    const user_id = this.props.activeUser.id
    const match = this.props.favoriteArray.filter(favMovie => favMovie.movie_id === movie.movie_id)

    movie.user_id = user_id //added for backend purposes

    match.length > 0 ?
      await deleteFavorite(user_id, movie.movie_id ) : await addFavorite(movie)

    this.getFavorites(user_id) //update store, trigger css rerender
  }

  getFavorites = async (user) => {
    const allFavs = await getAllFavorites(user);
    this.props.addFavorite(allFavs.data);
  }

  render() {
    return (
      <div className="MovieContainer">
        {
          this.cardsArray()
        }
      </div>
    )
  }
}

export const mapStateToProps = ({movieArray, activeUser, favoriteArray}) => ({
  movieArray,
  activeUser,
  favoriteArray,
})

export const mapDispatchToProps = (dispatch) => ({
  addFavorite: (favoriteData) => dispatch(addFavoriteAction(favoriteData))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer)

MovieContainer.propTypes = {
  favoriteArray: PropTypes.array.isRequired,
  activeUser: PropTypes.object,
  addFavorite: PropTypes.func
};