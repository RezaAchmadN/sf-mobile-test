import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";

import { Styles } from "../../../Styles";
import { fetchSearchMovies } from "../../Actions";

// Using SearchBarBaseProps instead of SearchBarDefaultProps & SearchBarAndroidProps & SearchBarIOSProps
const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;

const MovieList = React.lazy<any>(() => import("../../components/MovieCard"));

export default function Search({ navigation }: any): JSX.Element {
  const [Movies, setMovies] = useState<any>([]);
  const [Page, setPage] = useState<number>(1);
  const [TotalPage, setTotalPage] = useState<number>(1);
  const [SearchQuery, setSearchQuery] = React.useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);

  return (
    <SafeAreaView>
      <SafeSearchBar
        placeholder="Type Here..."
        onChangeText={(value: string) => {
          setSearchQuery(value);
        }}
        value={SearchQuery}
        onSubmitEditing={() => {
          if (!!SearchQuery) {
            setLoading(true);
            fetchSearchMovies(1, SearchQuery)
              .then((res: any) => {
                setMovies(res.data.results);
                setPage(res.data.page);
                setTotalPage(res.data.total_pages);
              })
              .finally(() => setLoading(false));
          }
        }}
        platform={"ios"}
      />
      <React.Suspense
        fallback={
          <View style={Styles.center}>
            <ActivityIndicator size="large" color={"#0000ff"} />
          </View>
        }
      >
        <FlatList
          style={Styles.movieLayout}
          contentContainerStyle={{ paddingBottom: 108 }}
          data={Movies}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            if (TotalPage > Page) {
              setLoading(true);
              fetchSearchMovies(Page + 1, SearchQuery)
                .then((res: any) => {
                  setMovies([...Movies, ...res.data.results]);
                  setPage(res.data.page);
                  setTotalPage(res.data.total_pages);
                })
                .finally(() => setLoading(false));
            }
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigation?.push("MovieDetail", {
                  title: item.title,
                  props: item,
                })
              }
            >
              <MovieList {...item} />
            </TouchableOpacity>
          )}
        />
      </React.Suspense>
      {Loading && (
        <ActivityIndicator
          style={Styles.center}
          size="large"
          color={"#0000ff"}
        />
      )}
    </SafeAreaView>
  );
}
