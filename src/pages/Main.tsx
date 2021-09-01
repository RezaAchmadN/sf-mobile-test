import React from "react";
import { StoreProvider } from "../Store";
import App from "../../App";
import { RouteComponentProps, Router } from "@reach/router";
import Home from "./Home";


export default function Main() {
  const RouterPage = (
    props: { pageComponent: JSX.Element } & RouteComponentProps
  ) => props.pageComponent;
  return (
    <StoreProvider>
      <Home/>
    </StoreProvider>
  );
}
