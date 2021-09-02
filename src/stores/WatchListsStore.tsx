import React from "react";
import { IAction } from "../interfaces";

export const WatchListsStore = React.createContext<any>([]);

function reducer(movies: [], action: IAction) {
  switch (action.type) {
    case "ADD_FAV":
      return [...movies, action.payload];
    case "REMOVE_FAV":
      return action.payload;
    default:
      return movies;
  }
}

export function WatchListProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [watchLists, watchListsDispatch] = React.useReducer(reducer, []);
  return (
    <WatchListsStore.Provider value={{ watchLists, watchListsDispatch }}>
      {children}
    </WatchListsStore.Provider>
  );
}
