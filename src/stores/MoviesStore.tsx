import React from "react";

export const MoviesStore = React.createContext<any>([]);

function reducer(movies: [], Action: []): [] {
  return [...movies, ...Action];
}

export function MoviesProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [movies, moviesDispatch] = React.useReducer(reducer, []);
  return (
    <MoviesStore.Provider value={{ movies, moviesDispatch }}>
      {children}
    </MoviesStore.Provider>
  );
}
