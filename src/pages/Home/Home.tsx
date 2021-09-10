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
import { useLazyQuery, useQuery } from "@apollo/client";

import { Styles } from "../../../Styles";
import { MOVIE_LIST } from "../../services/tmdb";

const MovieCard = React.lazy<any>(() => import("../../components/MovieCard"));

export default function Home({ navigation }: any): JSX.Element {
  const [Movies, setMovies] = useState<any>([]);
  const [Page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState<number>(1);

  const { loading, error, refetch } = useQuery(MOVIE_LIST, {
    notifyOnNetworkStatusChange: true,
    onError: () => {
      console.log(error);
    },
    onCompleted: (data) => {
      console.log("onCompleted");
      setMovies([...Movies, ...data.Movies.results]);
      setPage(data.Movies.page);
      setTotalPage(data.Movies.total_pages);
    },
  });
  console.log(loading);
  

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
            if (TotalPage > Page) refetch();
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation?.push("MovieDetail", { title: item.title })
              }
            >
              <MovieCard {...item} testID="MovieCard" />
            </TouchableOpacity>
          )}
        />
      </React.Suspense>
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
