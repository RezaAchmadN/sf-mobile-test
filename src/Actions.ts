import { IMovie, IAction, IState } from "./interfaces";

export const fetchDataAction = async (dispatch: any) => {
  const URL =
    "https://api.themoviedb.org/3/discover/movie?page=2&api_key=48367485a90367721f562c3532360bb3";
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dispatch({
    type: "FETCH_DATA",
    payload: dataJSON,
  });
};

export const toogleFavAction = (
  state: IState,
  dispatch: any,
  movie: IMovie | any
): IAction => {
  const movieInFav = state.favourites.includes(movie);
  let dispatchObj = {
    type: "ADD_FAV",
    payload: movie,
  };
  if (movieInFav) {
    const favWithoutMovie = state.favourites.filter(
      (fav: IMovie) => fav.id !== movie.id
    );
    dispatchObj = {
      type: "REMOVE_FAV",
      payload: favWithoutMovie,
    };
  }
  return dispatch(dispatchObj);
};
