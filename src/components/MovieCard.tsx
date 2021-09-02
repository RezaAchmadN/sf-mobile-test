import React from "react";
import { IMovie } from "../Interfaces";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Styles } from "../../Styles";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { WatchListsStore } from "../stores/WatchListsStore";
import { toogleFavAction } from "../Actions";

export default function movieList(movie: IMovie): JSX.Element {
  const { watchLists, watchListsDispatch } = React.useContext(WatchListsStore);
  
  const imgBaseURL = "https://www.themoviedb.org/t/p/w100_and_h100_bestv2/";
  return (
    <View style={Styles.movieBox}>
      <Image
        style={Styles.imageAtList}
        source={{ uri: imgBaseURL + movie.poster_path }}
      />
      <Text style={Styles.title}>{movie.title}</Text>
      <TouchableOpacity onPress={() => toogleFavAction(watchLists, watchListsDispatch, movie)} >
      {watchLists.find((fav: IMovie) => fav.id === movie.id) ?
        <Ionicons name="md-checkmark-circle-outline" style={Styles.iconOff} size={30}/>
        : <Entypo name="back-in-time" style={Styles.iconOn} size={30}/>
      }
      </TouchableOpacity>
    </View>
  );
}
