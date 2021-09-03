import React from "react";
import { IMovie, IAction } from "./interfaces";


const getCurrentDate=(datePlus: number, monthPlus: number, yearPlus: number )=>{
  const date = new Date().getDate() + datePlus;
  const month = new Date().getMonth() + 1 + monthPlus;
  const year = new Date().getFullYear() + yearPlus;
  const dd = (date < 10 ? '0' : '') + date;
  const mm = (month < 10 ? '0' : '') + month;
  return year + '-' + mm + '-' + dd;
}

export const fetchDataMoviesAction = async (dispatch: React.Dispatch<[]>) => {
  const URL =
    "https://api.themoviedb.org/3/discover/movie?page=1&api_key=48367485a90367721f562c3532360bb3";
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dispatch(dataJSON.results);
};

export const fetchDataPopularAction = async (dispatch: React.Dispatch<[]>) => {
  const URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.asc&api_key=48367485a90367721f562c3532360bb3";
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dispatch(dataJSON.results);
};

export const fetchDataNowPlayingAction = async (dispatch: React.Dispatch<[]>) => {
  const URL = 
    `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${getCurrentDate(0,-1,0)}&primary_release_date.lte=${getCurrentDate(0,0,0)}&api_key=48367485a90367721f562c3532360bb3`
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dispatch(dataJSON.results);
}
export const toogleFavAction = (
  movies: Array<IMovie>,
  dispatch: any,
  movie: IMovie | any
): IAction => {
  const favWithMovie = movies.filter((fav: IMovie) => fav.id === movie.id);
  let dispatchObj = {
    type: "ADD_FAV",
    payload: movie,
  };
  if (favWithMovie.length) {
    const favWithoutMovie = movies.filter((fav: IMovie) => fav.id !== movie.id);
    dispatchObj = {
      type: "REMOVE_FAV",
      payload: favWithoutMovie,
    };
  }
  return dispatch(dispatchObj);
};
