import axios from "axios";
import { IMovie, IAction } from "./interfaces";

const TMDBAPIKEY = "48367485a90367721f562c3532360bb3";
const client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 20000
})

export const fetchMovies = async (page: number) => {
  try {
    const response = await client.get(`/discover/movie?page=${page}&api_key=${TMDBAPIKEY}`)
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchPopularMovies = async (page: number, order: any) => {
  try {
    const response = await client.get(`/discover/movie?sort_by=popularity.${order}&page=${page}&api_key=${TMDBAPIKEY}`)
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchNowPlayingMovies = async (page: number, gte: any, lte: any) => {
  try {
    const response = await client.get(`/discover/movie?primary_release_date.gte=${gte}&primary_release_date.lte=${lte}&page=${page}&api_key=${TMDBAPIKEY}`)
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchSearchMovies = async (page: number, searchQuery: string) => {
  try {
    const response = await client.get(`/search/movie?api_key=${TMDBAPIKEY}&query=${searchQuery}&page=${page}`)
    return response;
  } catch (error) {
    return error;
  }
};

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
