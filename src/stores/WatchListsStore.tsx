import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAction } from "../interfaces";

const storeData = async (value: any) => {
  try {
    await AsyncStorage.setItem("WatchLists", value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("WatchLists");
    return JSON.parse(value || "[]");
  } catch (e) {
    console.log(e);
  }
};

export var WatchListsStore = React.createContext<any>([]);

function reducer(movies: [], action: IAction) {
  switch (action.type) {
    case "ADD_FAV":
      const res = [...movies, action.payload];
      storeData(JSON.stringify(res));
      return res;
    case "REMOVE_FAV":
      storeData(JSON.stringify(action.payload));
      return action.payload;
    case "INITIATE":
      return action.payload;
    default:
      return movies;
  }
}

export function WatchListProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [watchLists, watchListsDispatch] = React.useReducer(reducer, []);

  React.useEffect(() => {
    getData().then((value: any) =>
      watchListsDispatch({ type: "INITIATE", payload: value })
    );
  }, []);

  return (
    <WatchListsStore.Provider value={{ watchLists, watchListsDispatch }}>
      {children}
    </WatchListsStore.Provider>
  );
}
