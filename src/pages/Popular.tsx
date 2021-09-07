import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";

import { Styles } from "../../Styles";
import { fetchDataPopularAction } from "../Actions";
import { IMovie } from "../interfaces";
import PopularProvider, { PopularStore } from "../stores/PopularStore";

const MovieList = React.lazy<any>(() => import("../components/MovieCard"));

export default function Popular({ navigation }: any) {
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
