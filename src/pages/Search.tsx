import React, { useContext } from "react";
import {
  Keyboard,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";

import { Styles } from "../../Styles";
import { fetchDataSearchAction } from "../Actions";
import { IMovie } from "../interfaces";
import SearchProvider, { SearchStore } from "../stores/SearchStore";

// Using SearchBarBaseProps instead of SearchBarDefaultProps & SearchBarAndroidProps & SearchBarIOSProps
const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;

const MovieList = React.lazy<any>(() => import("../components/MovieCard"));

export default function Search({ navigation }: any): JSX.Element {
  return (
    <SearchProvider>
      <SearchScreen {...navigation} />
    </SearchProvider>
  );
}

function SearchScreen(navigation: any): JSX.Element {
  const { searchedMovies, searchDispatch } = useContext(SearchStore);
  const [SearchQuery, setSearchQuery] = React.useState("");

  const handleSearchButtonPressed = () => {
    fetchDataSearchAction(searchDispatch, SearchQuery).then(() =>
      console.log(searchedMovies)
    );
    Keyboard.dismiss();
  };

  return (
    <View>
      <SafeSearchBar
        placeholder="Type Here..."
        onChangeText={(value: string) => setSearchQuery(value)}
        value={SearchQuery}
        platform={"ios"}
        onSubmitEditing={() => {
          handleSearchButtonPressed();
        }}
      />
      <ScrollView>
        <React.Suspense
          fallback={
            <View style={Styles.center}>
              <Text>loading...</Text>
            </View>
          }
        >
          <View style={Styles.movieLayout}>
            {searchedMovies.map((movie: IMovie, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation?.push("MovieDetail", { title: movie.title })
                }
              >
                <MovieList {...movie} />
              </TouchableOpacity>
            ))}
          </View>
        </React.Suspense>
      </ScrollView>
    </View>
  );
}
