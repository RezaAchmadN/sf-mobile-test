import React from "react";
import { IMovie } from "../interfaces";
import { fetchDataMoviesAction } from "../Actions";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Styles } from "../../Styles";
import { MoviesProvider, MoviesStore } from "../stores/MoviesStore";

const MovieList = React.lazy<any>(() => import("../components/MovieCard"));

export default function Home({ navigation }: any): JSX.Element {
  return (
    <MoviesProvider>
      <HomeScreen {...navigation} />
    </MoviesProvider>
  );
}

function HomeScreen(navigation: any): JSX.Element {
  const { movies, moviesDispatch } = React.useContext(MoviesStore);

  React.useEffect(() => {
    movies.length === 0 && fetchDataMoviesAction(moviesDispatch);
  });

  return (
    <ScrollView>
      <React.Suspense fallback={<Text>loading...</Text>}>
        <View style={Styles.movieLayout}>
          {movies.map((movie: IMovie, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation?.push("MovieDetail", { title: movie.title })
                }
              >
                <MovieList {...movie} />
              </TouchableOpacity>
            );
          })}
        </View>
      </React.Suspense>
    </ScrollView>
  );
}
