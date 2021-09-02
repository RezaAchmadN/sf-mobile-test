import React from "react";
import { IMovie } from "../interfaces";
import { ScrollView, Text, View } from "react-native";
import { Styles } from "../../Styles";
import { WatchListsStore } from "../stores/WatchListsStore";

const MovieList = React.lazy<any>(() => import("../components/MovieCard"));

export default function WatchLists(): JSX.Element {
  const { watchLists } = React.useContext(WatchListsStore);

  return (
    <ScrollView>
      <React.Suspense fallback={<Text>loading...</Text>}>
        <View style={Styles.movieLayout}>
          {watchLists.map((movie: IMovie, index: number) => (
            <MovieList key={index} {...movie} />
          ))}
        </View>
      </React.Suspense>
    </ScrollView>
  );
}
