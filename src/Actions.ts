import { IMovie, IAction, IState } from "./interfaces";

export const fetchDataAction = async (dispatch: any) => {
  const URL =
    "https://api.themoviedb.org/3/discover/movie?page=1&api_key=48367485a90367721f562c3532360bb3";
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dispatch(dataJSON.results);
};

export const toogleFavAction = (
  movies: Array<IMovie>,
  dispatch: any,
  movie: IMovie | any
): IAction => {
  const favWithMovie = movies.filter(
    (fav: IMovie) => fav.id === movie.id
  );
  let dispatchObj = {
    type: "ADD_FAV",
    payload: movie,
  };
  if (favWithMovie.length) {
    const favWithoutMovie = movies.filter(
      (fav: IMovie) => fav.id !== movie.id
    );
    dispatchObj = {
      type: "REMOVE_FAV",
      payload: favWithoutMovie,
    };
  }
  return dispatch(dispatchObj);
};