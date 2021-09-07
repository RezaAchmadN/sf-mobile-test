import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from 'react-native-elements';
import Feather from "react-native-vector-icons/Feather";

import { Styles } from "../../Styles";
import { fetchDataNowPlayingAction } from "../Actions";
import { IMovie } from "../interfaces";
import NowPlayingProvider, { NowPlayingStore } from "../stores/NowPlayingStore";

const MovieList = React.lazy(() => import("../components/MovieCard"));

export default function NowPlaying({ navigation }: any) {
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
    <NowPlayingProvider>
      <NowPLayingScreen {...navigation} />
    </NowPlayingProvider>
  );
}

function NowPLayingScreen(navigation: any): JSX.Element {
  const { nowPlaying, nowPLayingDispatch } = React.useContext(NowPlayingStore);

  React.useEffect(() => {
    nowPlaying.length === 0 && fetchDataNowPlayingAction(nowPLayingDispatch);
  });

  return (
    <ScrollView>
      <React.Suspense fallback={<View style={Styles.center}><Text>loading...</Text></View>}>
        <View style={Styles.movieLayout}>
          {nowPlaying.map((movie: IMovie, index: number) => (
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
