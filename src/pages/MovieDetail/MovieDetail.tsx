import React from "react";
import { View, Image, Text, StyleSheet, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { toogleFavAction } from "../../Actions";
import { IMovie } from "../../Interfaces";
import { WatchListsStore } from "../../stores/WatchListsStore";

const imgBaseURL = "https://www.themoviedb.org/t/p/original/";
export default function MovieDetail({ route }: any) {
  const { props } = route.params;
  const { watchLists, watchListsDispatch } = React.useContext(WatchListsStore);

  return (
    <ScrollView style={Styles.container}>
      <View style={Styles.container_image}>
        <Image
          style={Styles.image}
          source={{ uri: imgBaseURL + props.poster_path }}
        />
      </View>
      <View>
        <Text style={Styles.title_text}>{props.title}</Text>
        <View style={Styles.continer_container_tag}>
          <View style={Styles.container_tag}>
            <Text style={Styles.bold_tag}>Release Date:</Text>
            <Text>{props.release_date}</Text>
          </View>
          <View style={Styles.container_tag}>
            <Text style={Styles.bold_tag}>vote_average:</Text>
            <Text>{props.vote_average}</Text>
          </View>
        </View>
      </View>
      <View style={{ paddingBottom: 12 }}>
        <Text>{props.overview}</Text>
      </View>
      <View style={{ paddingBottom: 36 }}>
        {watchLists.find((fav: IMovie) => fav.id === props.id) ? (
          <Button
            title="Remove Watch Later"
            color='red'
            onPress={() =>
              toogleFavAction(watchLists, watchListsDispatch, props)
            }
          />
        ) : (
          <Button
            title="Watch Later"
            onPress={() =>
              toogleFavAction(watchLists, watchListsDispatch, props)
            }
          />
        )}
      </View>
    </ScrollView>
  );
}

export const Styles = StyleSheet.create({
  container: {
    margin: 12,
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
    resizeMode: "contain",
  },

  container_image: {
    alignItems: "center",
    paddingBottom: 12,
  },

  title_text: {
    fontSize: 24,
    paddingBottom: 8,
  },

  container_tag: { display: "flex", flexDirection: "row" },
  bold_tag: { fontWeight: "bold", marginRight: 4 },
  continer_container_tag: { paddingBottom: 16 },

  container_card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
  },
});
