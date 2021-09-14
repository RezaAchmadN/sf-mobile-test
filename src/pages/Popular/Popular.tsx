import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";

import { Styles } from "../../../Styles";
import { POPULAR_MOVIE_LIST } from "../../services/tmdb";
import MovieCard from "../../components/MovieCard";

export default function Popular({ navigation }: any) {
  const [Movies, setMovies] = useState<any>([]);
  const [Page, setPage] = useState<number>(1);
  const [TotalPage, setTotalPage] = useState<number>(1);

  const { loading, error, refetch } = useQuery(POPULAR_MOVIE_LIST, {
    variables: { order: "asc", page: Page },
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      // console.log(error);
    },
    onCompleted: (data) => {
      setMovies([...Movies, ...data.Movies.results]);
      setPage(data.Movies.page);
      setTotalPage(data.Movies.total_pages);
    },
  });

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
      {error && <Text>Error!</Text>}
        <FlatList
          style={Styles.movieLayout}
          contentContainerStyle={{ paddingBottom: 32 }}
          data={Movies}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            if (TotalPage > Page)
              refetch({
                 order: "asc", page: Page + 1 
              });
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation?.push("MovieDetail", { title: item.title })
              }
            >
              <MovieCard {...item} />
            </TouchableOpacity>
          )}
        />
      {loading && (
        <ActivityIndicator
          style={Styles.center}
          size="large"
          color={"#0000ff"}
          testID="loading"
        />
      )}
    </SafeAreaView>
  );
}
