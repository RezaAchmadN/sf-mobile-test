import React from "react";
import { IMovie } from "../interfaces";
import { fetchDataMoviesAction } from "../Actions";
import { ScrollView, View, Text } from "react-native";
import { Styles } from "../../Styles";
import { MoviesStore } from "../stores/MoviesStore";

const MovieList = React.lazy<any>(() => import("../components/MovieCard"));

export default function Home(): JSX.Element {
  const { movies, moviesDispatch } = React.useContext(MoviesStore);

  React.useEffect(() => {
    movies.length === 0 && fetchDataMoviesAction(moviesDispatch);
  });

  return (
    <ScrollView>
      <React.Suspense fallback={<Text>loading...</Text>}>
        <View style={Styles.movieLayout}>
          {movies.map((movie: IMovie, index: number) => (
            <MovieList key={index} {...movie} />
          ))}
        </View>
      </React.Suspense>
    </ScrollView>
  );
}
