import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { Headers } from "cross-fetch";

global.Headers = global.Headers || Headers;

const restLink = new RestLink({
  uri: "https://api.themoviedb.org/3/",
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

export default client;