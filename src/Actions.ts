import { IMovie, IAction } from "./interfaces";

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
