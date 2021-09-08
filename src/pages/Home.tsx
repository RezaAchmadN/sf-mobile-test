import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import { useLazyQuery } from "@apollo/client";

import { Styles } from "../../Styles";
import { MOVIE_LIST } from "../services/tmdb";

const MovieList = React.lazy<any>(() => import("../components/MovieCard"));

export default function Home({ navigation }: any): JSX.Element {
  const [Movies, setMovies] = useState<any>([]);
  const [Page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState<number>(1);

  const [fetchMovieList, { loading, error }] = useLazyQuery(MOVIE_LIST, {
    onCompleted: (data) => {
      setMovies([...Movies, ...data.Movies.results]);
      setPage(data.Movies.page);
      setTotalPage(data.Movies.total_pages);
    },
  });

  useEffect(() => {
    fetchMovieList({
      variables: { page: Page },
    });
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.push("Search")}
          icon={<Feather name="search" size={30} />}
          type="clear"
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      {error && <Text>`Error! ${error}`</Text>}
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
          data={Movies}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            if (TotalPage > Page)
              fetchMovieList({
                variables: { page: Page + 1 },
              });
          }}
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
      {loading && (
        <ActivityIndicator
          style={Styles.center}
          size="large"
          color={"#0000ff"}
        />
      )}
    </SafeAreaView>
  );
}
