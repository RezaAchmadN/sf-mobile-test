import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Styles } from "../../Styles";
import { fetchDataNowPlayingAction } from "../Actions";
import { IMovie } from "../interfaces";
import NowPlayingProvider, { NowPlayingStore } from "../stores/NowPlayingStore";

const MovieList = React.lazy(() => import("../components/MovieCard"));

export default function NowPlaying() {
  return (
    <NowPlayingProvider>
      <NowPLayingScreen />
    </NowPlayingProvider>
  );
}

function NowPLayingScreen(): JSX.Element {
  const { nowPlaying, nowPLayingDispatch } = React.useContext(NowPlayingStore);

  React.useEffect(() => {
    nowPlaying.length === 0 && fetchDataNowPlayingAction(nowPLayingDispatch);
  });

  return (
    <ScrollView>
      <React.Suspense fallback={<Text>Loading...</Text>}>
        <View style={Styles.movieLayout}>
          {nowPlaying.map((movie: IMovie, index: number) => (
            <MovieList key={index} {...movie} />
          ))}
        </View>
      </React.Suspense>
    </ScrollView>
  );
}
