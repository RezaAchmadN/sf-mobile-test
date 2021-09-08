import React from "react";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";

import { Styles } from "./Styles";
import Home from "./src/pages/Home";
import WatchList from "./src/pages/WatchList";
import { WatchListProvider } from "./src/stores/WatchListsStore";
import Popular from "./src/pages/Popular";
import NowPlaying from "./src/pages/NowPlaying";
import MovieDetail from "./src/pages/MovieDetail";
import Search from "./src/pages/Search";
import client from "./src/lib/ApolloClient";

function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Popular Movies" component={Popular} />
      <Drawer.Screen name="Now Playing Movies" component={NowPlaying} />
      <Drawer.Screen name="WatchList" component={WatchList} />
    </Drawer.Navigator>
  );
}

export default function App(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <View style={Styles.root}>
      <ApolloProvider client={client}>
        <WatchListProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Root">
              <Stack.Screen
                name="Root"
                component={DrawerNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MovieDetail"
                component={MovieDetail}
                options={({ route }: any) => ({ title: route.params.title })}
              />
              <Stack.Screen name="Search" component={Search} />
            </Stack.Navigator>
          </NavigationContainer>
        </WatchListProvider>
      </ApolloProvider>
    </View>
  );
}

/**
 * TODO: Implement Unit Testing
 */
