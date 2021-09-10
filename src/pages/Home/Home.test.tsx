jest.useFakeTimers();
import React from "react";
import { render } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import { MOVIE_LIST } from "../../services/tmdb";
import Home from "./Home";

const props = {
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
  },
} as any;

const mocks = [
  {
    request: {
      query: MOVIE_LIST,
      variables: { page: 1 },
    },
    result: {
      data: {
        Movies: {
          __typename: "Movies",
          results: [
            {
              __typename: "Movie",
              id: 603,
              title: "The Matrix",
              overview:
                "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
              poster_path: "/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",
              release_date: "1999-03-30",
              vote_average: 8.1,
            },
          ],
        },
      },
    },
  },
];

describe("HomeScreen", () => {
  it("Testing the 'loading'", () => {
    const component = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Home {...props} />
      </MockedProvider>
    );
    expect(component.getByTestId("loading")).toBeTruthy;
  });

  it("onSuccess", async () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home {...props} />
      </MockedProvider>
    );
    
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(component.getByTestId("loading")).resolves.toBeTruthy;
  });
});
