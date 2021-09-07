import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Styles } from "../../Styles";
import { fetchDataPopularAction } from "../Actions";
import { IMovie } from "../interfaces";
import PopularProvider, { PopularStore } from "../stores/PopularStore";

const MovieList = React.lazy<any>(() => import("../components/MovieCard"));

export default function Popular({ navigation }: any) {
  return (
    <PopularProvider>
      <PopularScreen {...navigation} />
    </PopularProvider>
  );
}

function PopularScreen(navigation: any): JSX.Element {
  const { popular, popularDispatch } = React.useContext(PopularStore);

  React.useEffect(() => {
    popular.length === 0 && fetchDataPopularAction(popularDispatch);
  });
  return (
    <ScrollView>
      <React.Suspense fallback={<View style={Styles.center}><Text>loading...</Text></View>}>
        <View style={Styles.movieLayout}>
          {popular.map((movie: IMovie, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation?.push("MovieDetail", { title: movie.title })
              }
            >
              <MovieList {...movie} />
            </TouchableOpacity>
          ))}
        </View>
      </React.Suspense>
    </ScrollView>
  );
}
