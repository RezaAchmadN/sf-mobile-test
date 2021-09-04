import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Styles } from "../../Styles";
import { fetchDataPopularAction } from "../Actions";
import { IMovie } from "../interfaces";
import PopularProvider, { PopularStore } from "../stores/PopularStore";

const MovieList = React.lazy<any>(() => import("../components/MovieCard"));

export default function Popular() {
  return (
    <PopularProvider>
      <PopularScreen />
    </PopularProvider>
  );
}

function PopularScreen(): JSX.Element {
  const { popular, popularDispatch } = React.useContext(PopularStore);

  React.useEffect(() => {
    popular.length === 0 && fetchDataPopularAction(popularDispatch);
  });
  return (
    <ScrollView>
      <React.Suspense fallback={<Text>loading...</Text>}>
        <View style={Styles.movieLayout}>
          {popular.map((movie: IMovie, index: number) => (
            <MovieList key={index} {...movie} />
          ))}
        </View>
      </React.Suspense>
    </ScrollView>
  );
}
