import React from "react";
import { Store } from "../Store";
import { IMovieProps } from "../interfaces";
import { toogleFavAction } from "../Actions";
import { ScrollView, Text, View } from "react-native";
import { Styles } from "../../Styles";

const MovieList = React.lazy<any>(() => import("../components/MovieList"));

export default function WatchLists(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

  const props: IMovieProps = {
    movies: state.WatchLists,
    toogleFavAction,
    WatchLists: state.WatchLists,
    store: { state, dispatch },
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
