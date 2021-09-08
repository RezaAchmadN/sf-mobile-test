import React from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";

import { Styles } from "../../Styles";
import { WatchListsStore } from "../stores/WatchListsStore";

const MovieList = React.lazy<any>(() => import("../components/MovieCard"));

export default function WatchLists({ navigation }: any): JSX.Element {
  const { watchLists } = React.useContext(WatchListsStore);

  return (
    <SafeAreaView>
      <React.Suspense
        fallback={
          <View style={Styles.center}>
            <ActivityIndicator size="large" color={"#0000ff"} />
          </View>
        }
      >
        <FlatList
          style={Styles.movieLayout}
          contentContainerStyle={{ paddingBottom: 32 }}
          data={watchLists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation?.push("MovieDetail", { title: item.title })
              }
            >
              <MovieList {...item} />
            </TouchableOpacity>
          )}
        />
      </React.Suspense>
    </SafeAreaView>
  );
}
