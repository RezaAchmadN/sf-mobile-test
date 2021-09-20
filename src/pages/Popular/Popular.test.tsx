import React from "react";
import axios from "axios";
import { create, ReactTestRenderer, act } from "react-test-renderer";

import Popular from "./Popular";
import { WatchListProvider } from "../../stores/WatchListsStore";
import MovieCard from "../../components/MovieCard";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const props = {
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
  },
} as any;

describe("Empty API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Empty Page", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          page: null,
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
          total_pages: 1,
        },
      })
    );

    const component = create(
      <WatchListProvider>
        <Popular {...props} />
      </WatchListProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.root.findAllByType(MovieCard).length).toBe(1);
  });

  it("Empty total_pages", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          page: 1,
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
          total_pages: null,
        },
      })
    );

    const component = create(
      <WatchListProvider>
        <Popular {...props} />
      </WatchListProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.root.findAllByType(MovieCard).length).toBe(1);
  });

});