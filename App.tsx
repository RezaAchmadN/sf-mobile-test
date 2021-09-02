import React from "react";
import { View } from "react-native";
import { Styles } from "./Styles";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/pages/Home";
import WatchList from "./src/pages/WatchList";
import { WatchListProvider } from "./src/stores/WatchListsStore";
import { MoviesProvider } from "./src/stores/MoviesStore";

export default function App(props: any): JSX.Element {
  const Drawer = createDrawerNavigator();

  return (
    <View style={Styles.root}>
      <WatchListProvider>
        <MoviesProvider>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="WatchList" component={WatchList} />
            </Drawer.Navigator>
          </NavigationContainer>
        </MoviesProvider>
      </WatchListProvider>
    </View>
  );
}
