import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

import { IMovie, IAction } from "./interfaces";

export const restLink = new RestLink({
  uri: "https://api.themoviedb.org/3/",
});

const getCurrentDate = (
  datePlus: number,
  monthPlus: number,
  yearPlus: number
) => {
  const date = new Date().getDate() + datePlus;
  const month = new Date().getMonth() + 1 + monthPlus;
  const year = new Date().getFullYear() + yearPlus;
  const dd = (date < 10 ? "0" : "") + date;
  const mm = (month < 10 ? "0" : "") + month;
  return year + "-" + mm + "-" + dd;
};

export const fetchDataMoviesAction = async (dispatch: React.Dispatch<[]>) => {
  const query = gql`
    query Movies {
      Movies
        @rest(
          type: "Movies"
          method: "GET"
          path: "discover/movie?page=2&api_key=48367485a90367721f562c3532360bb3"
        ) {
        results {
          id
          title
          poster_path
          overview
          release_date
          vote_average
        }
      }
    }
  `;
  const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
  });

  await client.query({ query }).then((response) => {
    return dispatch(response.data.Movies.results);
  });
};

export const fetchDataPopularAction = async (dispatch: React.Dispatch<[]>) => {
  const query = gql`
    query Movies {
      Movies
        @rest(
          type: "Movies"
          method: "GET"
          path: "discover/movie?sort_by=popularity.asc&api_key=48367485a90367721f562c3532360bb3"
        ) {
        results {
          id
          title
          poster_path
          overview
          release_date
          vote_average
        }
      }
    }
  `;
  const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
  });

  await client.query({ query }).then((response) => {
    return dispatch(response.data.Movies.results);
  });
};

export const fetchDataNowPlayingAction = async (
  dispatch: React.Dispatch<[]>
) => {
  const query = gql`
  query Movies {
    Movies
      @rest(
        type: "Movies"
        method: "GET"
        path: "discover/movie?primary_release_date.gte=${getCurrentDate(
          0,
          -1,
          0
        )}&primary_release_date.lte=${getCurrentDate(
    0,
    0,
    0
  )}&api_key=48367485a90367721f562c3532360bb3"
      ) {
      results {
        id
        title
        poster_path
        overview
        release_date
        vote_average
      }
    }
  }
`;
  const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
  });

  await client.query({ query }).then((response) => {
    return dispatch(response.data.Movies.results);
  });
};

export const fetchDataSearchAction = async (dispatch: React.Dispatch<[]>, searchQuery: string) => {
  const query = gql`
    query Movies {
      Movies
        @rest(
          type: "Movies"
          method: "GET"
          path: "search/movie?api_key=48367485a90367721f562c3532360bb3&query=${searchQuery}"
        ) {
        results @type(name: "Movie") {
          id
          title
          overview
          poster_path
          release_date
          vote_average
        }
      }
    }
  `;
  const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
  });

  await client.query({ query }).then((response) => {
    return dispatch(response.data.Movies.results);
  });
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
