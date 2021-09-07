import React, { createContext, useReducer } from "react";

export const SearchStore = createContext<any>([]);

function reducer(movies: [], action: []): [] {
  return action;
}

export default function SearchProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [searchedMovies, searchDispatch] = useReducer(reducer, []);
  return (
    <SearchStore.Provider value={{ searchedMovies, searchDispatch }}>
      {children}
    </SearchStore.Provider>
  );
}
