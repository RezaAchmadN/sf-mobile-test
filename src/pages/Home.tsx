import React from "react";
import { Store } from "../Store";
import { IMovieProps } from "../interfaces";
import { fetchDataAction, toogleFavAction } from "../Actions";
import { ScrollView, View, Text } from "react-native";
import { Styles } from "../../Styles";

const MovieList = React.lazy<any>(() => import("../components/MovieList"));

export default function Home(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.movies.length === 0 && fetchDataAction(dispatch);
  });

  const props: IMovieProps = {
    movies: state.movies,
    store: { state, dispatch },
    toogleFavAction,
    WatchLists: state.WatchLists,
  };

  return (
    <ScrollView>
      <React.Fragment>
        <React.Suspense fallback={<Text>loading...</Text>}>
          <View style={Styles.movieLayout}>
            <MovieList {...props} />
          </View>
        </React.Suspense>
      </React.Fragment>
    </ScrollView>
  );
}
