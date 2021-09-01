import React, { useState } from "react";
import { StoreProvider } from "../Store";
import { RouteComponentProps } from "@reach/router";
import Home from "./Home";
import WatchList from "./WatchList";
import { Pressable, View } from "react-native";
import { Styles } from "../../Styles";
import Entypo from "react-native-vector-icons/Entypo";



export default function Main(): JSX.Element {
  const RouterPage = (
    props: { pageComponent: JSX.Element } & RouteComponentProps
  ) => props.pageComponent;

  const [page, setPage] = useState(<Home/>)

  const pageChanger = (action: string) => {
    switch (action) {
      case 'HOME_PAGE':
          return setPage(<Home/>)
      case 'WATCHLIST_PAGE':
          return setPage(<WatchList/>)
      default:
          return setPage(<Home/>)
    }
  }

  return (
    <StoreProvider>
      {page}
      <View style={{alignItems:"center"}}>
        <View style={Styles.navContainer}>
          <View style={Styles.navBar}>
            <Pressable android_ripple={{borderless:true, radius:50}} onPress={() => pageChanger('HOME_PAGE')}>
              <Entypo name="home" style={Styles.iconNavBar} size={30}/>
            </Pressable>
            <Pressable android_ripple={{borderless:true, radius:50}} onPress={() => pageChanger('WATCHLIST_PAGE')}>
              <Entypo name="back-in-time" style={Styles.iconNavBar} size={30}/>
            </Pressable>
          </View>
        </View>
      </View>
    </StoreProvider>
  );
}
