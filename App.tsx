import React from "react";
import { View } from "react-native";
import { Styles } from "./Styles";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from "./src/Store";
import Home from "./src/pages/Home";
import WatchList from "./src/pages/WatchList";

export default function App(props: any): JSX.Element {

  const Drawer = createDrawerNavigator();
  
  return (
    <View style={Styles.root}>
      <StoreProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="WatchList" component={WatchList} />
          </Drawer.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </View>
  );
}
