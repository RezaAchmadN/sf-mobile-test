import React from "react";
import { Store } from "../store";
import { IMovieProps } from "../interfaces";
import { toogleFavAction } from "../Actions";
import { View } from "react-native";

const MovieList = React.lazy<any>(() => import("../components/MovieList"));

export default function Favourites() {
  const { state, dispatch } = React.useContext(Store);

  const props: IMovieProps = {
    movies: state.favourites,
    toogleFavAction,
    favourites: state.favourites,
    store: { state, dispatch },
  };

  console.log(state);

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>loading...</div>}>
        <View>
          <MovieList {...props} />
        </View>
      </React.Suspense>
    </React.Fragment>
  );
}
