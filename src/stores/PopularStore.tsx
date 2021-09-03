import React from "react";

export const PopularStore = React.createContext<any>([]);

function reducer(popular: [], action: []): [] {
  return [...popular, ...action];
}

export default function PopularProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [popular, popularDispatch] = React.useReducer(reducer, []);
  return (
    <PopularStore.Provider value={{ popular, popularDispatch }}>
      {children}
    </PopularStore.Provider>
  );
}
