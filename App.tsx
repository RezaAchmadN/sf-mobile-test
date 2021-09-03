import React from "react";
import { View } from "react-native";
import { Styles } from "./Styles";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/pages/Home";
import WatchList from "./src/pages/WatchList";
import { WatchListProvider } from "./src/stores/WatchListsStore";
import { MoviesProvider } from "./src/stores/MoviesStore";
import PopularProvider from "./src/stores/PopularStore";
import Popular from "./src/pages/Popular";
import NowPlayingProvider from "./src/stores/NowPlayingStore";
import NowPlaying from "./src/pages/NowPlaying";

export default function App(): JSX.Element {
  const Drawer = createDrawerNavigator();

  return (
    <View style={Styles.root}>
      <WatchListProvider>
        <MoviesProvider>
          <PopularProvider>
            <NowPlayingProvider>
              <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                  <Drawer.Screen name="Home" component={Home} />
                  <Drawer.Screen name="Popular Movies" component={Popular} />
                  <Drawer.Screen name="Now Playing Movies" component={NowPlaying} />
                  <Drawer.Screen name="WatchList" component={WatchList} />
                </Drawer.Navigator>
              </NavigationContainer>
            </NowPlayingProvider>
          </PopularProvider>
        </MoviesProvider>
      </WatchListProvider>
    </View>
  );
}
