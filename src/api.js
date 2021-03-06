import {key} from './apiKey';

export const apiMovieData = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return "Error";
  }
};

export const getAllUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  });
  const allUsers = await response.json();

  return allUsers.data;
};

export const validateUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify({email: email, password: password}),
      headers: {'Content-Type': 'application/json'},
    });
    const validation = await response.json();

    return validation;

  } catch (error) {
    return {status: 'fail'};
  }
};

export const signUpUser = async (email, password, name ) => {
  await fetch('http://localhost:3000/api/users/new', {
    method: 'POST',
    body: JSON.stringify({email, password, name}),
    headers: {'Content-Type': 'application/json'},
  });
};

export const deleteFavorite = async (user_id, movie_id) => {
  await fetch(`api/users/${user_id}/favorites/${movie_id}`, {
    method: 'DELETE',
    body: JSON.stringify({id: user_id, movie_id}),
    headers: {'Content-Type': 'application/json'},
  });
};

export const getAllFavorites = async (user_id) => {
  const response = await fetch(
    `http://localhost:3000/api/users/${user_id}/favorites`
  );
  return await response.json();
};

export const addFavorite = async (favMovieObject) => {
  const {
    movie_id,
    user_id,
    title,
    poster_path,
    release_date,
    vote_average,
    overview,
  } = favMovieObject;

  await fetch('api/users/favorites/new', {
    method: 'POST',
    body: JSON.stringify(
      {
        movie_id,
        user_id,
        title,
        poster_path,
        release_date,
        vote_average,
        overview,
      }
    ),
    headers: {'Content-Type': 'application/json'},
  });
};