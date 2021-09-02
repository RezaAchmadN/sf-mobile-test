import React from "react";
import { IMovie } from "../Interfaces";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { Styles } from "../../Styles";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function movieList(props: any): Array<JSX.Element> {
  const { movies, toogleFavAction, WatchLists, store } = props;
  const { state, dispatch } = store;
  
  const imgBaseURL = "https://www.themoviedb.org/t/p/w100_and_h100_bestv2/";
  return movies.map((movie: IMovie, index: number) => {
    return (
      <View key={index} style={Styles.movieBox}>
        <Image
          style={Styles.imageAtList}
          source={{ uri: imgBaseURL + movie.poster_path }}
        />
        <Text style={Styles.title}>{movie.title}</Text>
        <TouchableOpacity onPress={() => toogleFavAction(state, dispatch, movie)} >
        {WatchLists.find((fav: IMovie) => fav.id === movie.id) ?
          <Ionicons name="md-checkmark-circle-outline" style={Styles.iconOff} size={30}/>
          : <Entypo name="back-in-time" style={Styles.iconOn} size={30}/>
        }
        </TouchableOpacity>
      </View>
    );
  });
}
