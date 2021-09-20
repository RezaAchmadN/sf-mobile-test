import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";

import { Styles } from "../../../Styles";
import MovieCard from "../../components/MovieCard";
import { fetchPopularMovies } from "../../Actions";
import { oc } from "ts-optchain";

export default function Popular({ navigation }: any) {
  const [Movies, setMovies] = useState<any>([]);
  const [Page, setPage] = useState<number>(1);
  const [TotalPage, setTotalPage] = useState<number>(1);
  const [Loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchPopularMovies(Page, "asc")
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
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <FlatList
        style={Styles.movieLayout}
        contentContainerStyle={{ paddingBottom: 32 }}
        data={Movies}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          setLoading(true);
          if (TotalPage > Page)
            fetchPopularMovies(Page + 1, "asc")
              .then((res: any) => {
                const newMovie = oc(res).data.results([]);
                setMovies([...Movies, ...newMovie]);
                setPage(oc(res).data.page(Page + 1));
                setTotalPage(oc(res).data.total_pages(TotalPage));
              })
              .finally(() => setLoading(false));
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation?.push("MovieDetail", {
                title: item.title,
                props: item,
              })
            }
          >
            <MovieCard {...item} />
          </TouchableOpacity>
        )}
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
