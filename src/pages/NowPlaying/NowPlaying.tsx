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
import { getCurrentDate } from "../../services/date";
import { fetchNowPlayingMovies } from "../../Actions";

export default function NowPlaying({ navigation }: any) {
  const [Movies, setMovies] = useState<any>([]);
  const [Page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState<number>(1);
  const [Loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchNowPlayingMovies(
      Page,
      getCurrentDate(0, -1, 0),
      getCurrentDate(0, 0, 0)
    )
      .then((res: any) => {
        setMovies([...Movies, ...res.data.results]);
        setPage(res.data.page);
        setTotalPage(res.data.total_pages);
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
            fetchNowPlayingMovies(
              Page + 1,
              getCurrentDate(0, -1, 0),
              getCurrentDate(0, 0, 0)
            )
              .then((res: any) => {
                setMovies([...Movies, ...res.data.results]);
                setPage(res.data.page);
                setTotalPage(res.data.total_pages);
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
