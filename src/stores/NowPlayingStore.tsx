import React from "react";

export const NowPlayingStore = React.createContext<any>([]);

function reducer(nowPLaying: [], action: []): [] {
  return [...nowPLaying, ...action];
}
export default function NowPlayingProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [nowPlaying, nowPLayingDispatch] = React.useReducer(reducer, []);
  return (
    <NowPlayingStore.Provider value={{ nowPlaying, nowPLayingDispatch }}>
      {children}
    </NowPlayingStore.Provider>
  );
}
