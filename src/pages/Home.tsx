import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';
import Feather from "react-native-vector-icons/Feather";

import { IMovie } from "../interfaces";
import { fetchDataMoviesAction } from "../Actions";
import { Styles } from "../../Styles";
import { MoviesProvider, MoviesStore } from "../stores/MoviesStore";

const MovieList = React.lazy<any>(() => import("../components/MovieCard"));

export default function Home({ navigation }: any): JSX.Element {
React.useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <Button onPress={() => navigation.push("Search")} icon={
        <Feather name="search" size={30}/>
      } type="clear" />
    ),
  });
}, [navigation]);

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
      <React.Suspense fallback={<View style={Styles.center}><Text>loading...</Text></View>}>
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
