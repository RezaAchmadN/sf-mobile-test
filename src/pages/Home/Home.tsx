import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import { oc } from "ts-optchain";

import { Styles } from "../../../Styles";
import MovieCard from "../../components/MovieCard";
import { fetchMovies } from "../../Actions";

export default function Home({ navigation }: any): JSX.Element {
  const [Movies, setMovies] = useState<any>([]);
  const [Page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState<number>(1);
  const [Loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchMovies(Page)
      .then((res: any) => {
        const newMovie = oc(res).data.results([]);
        setMovies([...Movies, ...newMovie]);
        setPage(oc(res).data.page(Page));
        setTotalPage(oc(res).data.total_pages(TotalPage));
      })
      .finally(() => setLoading(false));
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.push("Search")}
          icon={<Feather name="search" size={30} />}
          type="clear"
          testID="SEARCH_BUTTON"
        />
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView>
      <FlatList
        testID="FlatList"
        style={Styles.movieLayout}
        contentContainerStyle={{ paddingBottom: 32 }}
        data={Movies}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (TotalPage > Page) {
            setLoading(true);
            fetchMovies(Page + 1)
              .then((res: any) => {
                const newMovie = oc(res).data.results([]);
                setMovies([...Movies, ...newMovie]);
                setPage(oc(res).data.page(Page + 1));
                setTotalPage(oc(res).data.total_pages(TotalPage));
              })
              .finally(() => setLoading(false));
          }
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              testID={`TouchableOpacity`}
              onPress={() =>
                navigation?.push("MovieDetail", {
                  title: item.title,
                  props: item,
                })
              }
            >
              <MovieCard {...item} />
            </TouchableOpacity>
          );
        }}
      />
      {Loading && (
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
