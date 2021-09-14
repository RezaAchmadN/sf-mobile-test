import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";

import { Styles } from "../../../Styles";
import { SEARCH_MOVIE } from "../../services/tmdb";

// Using SearchBarBaseProps instead of SearchBarDefaultProps & SearchBarAndroidProps & SearchBarIOSProps
const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;

const MovieList = React.lazy<any>(() => import("../../components/MovieCard"));

export default function Search({ navigation }: any): JSX.Element {
  const [Movies, setMovies] = useState<any>([]);
  const [Page, setPage] = useState<number>(1);
  const [TotalPage, setTotalPage] = useState<number>(1);
  const [SearchQuery, setSearchQuery] = React.useState<string>("");

  const [handleSearchButtonPressed, { loading, error }] = useLazyQuery(
    SEARCH_MOVIE,
    {
      onCompleted: (data) => {
        console.log(data);
        
        setMovies(data.Movies.results);
        setPage(data.Movies.page);
        setTotalPage(data.Movies.total_pages);
      },
    }
  );

  const [handleNextPage, { loading: loadingNextPage, error: errorNextPage }] =
    useLazyQuery(SEARCH_MOVIE, {
      onCompleted: (data) => {
        setMovies([...Movies, ...data.Movies.results]);
        setPage(data.Movies.page);
        Keyboard.dismiss();
      },
    });

  return (
    <SafeAreaView>
      <SafeSearchBar
        placeholder="Type Here..."
        onChangeText={(value: string) => {
          setSearchQuery(value);
        }}
        value={SearchQuery}
        onSubmitEditing={() => {
          !!SearchQuery &&
            handleSearchButtonPressed({
              variables: { searchQuery: SearchQuery, page: 1 },
            });
        }}
        platform={"ios"}
      />
      {(error || errorNextPage) && (
        <Text>`Error! ${error || errorNextPage}`</Text>
      )}
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
            if (TotalPage > Page)
              handleNextPage({
                variables: { searchQuery: SearchQuery, page: Page + 1 },
              });
          }}
          renderItem={({ item, index }) => (
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
      {(loading || loadingNextPage) && (
        <ActivityIndicator
          style={Styles.center}
          size="large"
          color={"#0000ff"}
        />
      )}
    </SafeAreaView>
  );
}
