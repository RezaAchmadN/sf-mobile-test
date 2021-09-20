import React from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

import { IMovie } from "../Interfaces";
import { Styles } from "../../Styles";
import { WatchListsStore } from "../stores/WatchListsStore";
import { toogleFavAction } from "../Actions";

export default function movieList(movie: IMovie): JSX.Element {
  const { watchLists, watchListsDispatch } = React.useContext(WatchListsStore);

  const imgBaseURL = "https://www.themoviedb.org/t/p/original/";

  return (
    <View style={Styles.movieBox} testID="MovieCard">
      <Image
        style={Styles.imageAtList}
        source={{ uri: imgBaseURL + movie.poster_path }}
      />
      <Text style={Styles.title}>{movie.title}</Text>
      <TouchableOpacity
        onPress={() => toogleFavAction(watchLists, watchListsDispatch, movie)}
      >
        {watchLists.find((fav: IMovie) => fav.id === movie.id) ? (
          <Ionicons
            name="md-checkmark-circle-outline"
            style={Styles.iconOff}
            size={30}
          />
        ) : (
          <Entypo name="back-in-time" style={Styles.iconOn} size={30} />
        )}
      </TouchableOpacity>
    </View>
  );
}
