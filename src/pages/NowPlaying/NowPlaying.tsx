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
import { NOW_PLAYING_MOVIE_LIST } from "../../services/tmdb";
import MovieCard from "../../components/MovieCard";
import { getCurrentDate } from "../../services/date";

export default function NowPlaying({ navigation }: any) {
  const [Movies, setMovies] = useState<any>([]);
  const [Page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState<number>(1);

  const { loading, error, refetch } = useQuery(NOW_PLAYING_MOVIE_LIST, {
    variables: {
      gte: getCurrentDate(0, -1, 0),
      lte: getCurrentDate(0, 0, 0),
      page: Page,
    },
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
              gte: getCurrentDate(0, -1, 0),
              lte: getCurrentDate(0, 0, 0),
              page: Page + 1,
            });
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation?.push("MovieDetail", { title: item.title, props: item })
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
