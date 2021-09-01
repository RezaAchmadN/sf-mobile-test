import React from "react";
import { IMovie } from "../Interfaces";
import { View, Text, Button, Image } from "react-native";

export default function movieList(props: any): Array<JSX.Element> {
  const { movies, toogleFavAction, favourites, store } = props;
  const { state, dispatch } = store;
  const imgBaseURL = "https://www.themoviedb.org/t/p/w100_and_h100_bestv2/";
  return movies.map((movie: IMovie, index: number) => {
    return (
      <View key={index} >
        <Image source={{uri: imgBaseURL + movie.poster_path}} />
        <Text>{movie.title}</Text>
        <Button onPress={() => toogleFavAction(state, dispatch, movie)}
            title={favourites.find((fav: IMovie) => fav.id === movie.id)
                ? "Unfavourite"
                : "Favourite"}
        />  
      </View>
    );
  });
}
