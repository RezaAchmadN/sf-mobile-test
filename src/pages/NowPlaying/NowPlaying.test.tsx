import React from "react";
import axios from "axios";
import { create, ReactTestRenderer, act } from "react-test-renderer";

import NowPlaying from "./NowPlaying";
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

describe("Correct API", () => {
  let component: ReactTestRenderer;
  beforeEach(() => {
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
            {
              __typename: "Movie",
              id: 604,
              title: "The Matrix Reloaded",
              overview:
                "Six months after the events depicted in The Matrix, Neo has proved to be a good omen for the free humans, as more and more humans are being freed from the matrix and brought to Zion, the one and only stronghold of the Resistance.  Neo himself has discovered his superpowers including super speed, ability to see the codes of the things inside the matrix and a certain degree of pre-cognition. But a nasty piece of news hits the human resistance: 250,000 machine sentinels are digging to Zion and would reach them in 72 hours. As Zion prepares for the ultimate war, Neo, Morpheus and Trinity are advised by the Oracle to find the Keymaker who would help them reach the Source.  Meanwhile Neo's recurrent dreams depicting Trinity's death have got him worried and as if it was not enough, Agent Smith has somehow escaped deletion, has become more powerful than before and has fixed Neo as his next target.",
              poster_path: "/jBegA6V243J6HUnpcOILsRvBnGb.jpg",
              release_date: "2003-05-15",
              vote_average: 6.9,
            },
          ],
          total_pages: 1,
        },
      })
    );

    component = create(
      <WatchListProvider>
        <NowPlaying {...props} />
      </WatchListProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Check the movie list", async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.root.findAllByType(MovieCard).length).toBe(2);
  });
});

describe("Empty API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Empty Movie Array", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          page: 1,
          results: [],
          total_pages: 1,
        },
      })
    );

    const component = create(
      <WatchListProvider>
        <NowPlaying {...props} />
      </WatchListProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.root.findAllByType(MovieCard).length).toBe(0);
  });

  it("Empty Title", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          page: 1,
          results: [
            {
              __typename: "Movie",
              id: 603,
              title: "",
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
        <NowPlaying {...props} />
      </WatchListProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.root.findAllByType(MovieCard).length).toBe(1);
  });

  it("Empty Overview", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          page: 1,
          results: [
            {
              __typename: "Movie",
              id: 603,
              title: "The Matrix",
              overview: "",
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
        <NowPlaying {...props} />
      </WatchListProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.root.findAllByType(MovieCard).length).toBe(1);
  });

  it("Empty Poster_path", async () => {
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
              poster_path: "",
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
        <NowPlaying {...props} />
      </WatchListProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.root.findAllByType(MovieCard).length).toBe(1);
  });

  it("Empty release_date", async () => {
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
              release_date: "",
              vote_average: 8.1,
            },
          ],
          total_pages: 1,
        },
      })
    );

    const component = create(
      <WatchListProvider>
        <NowPlaying {...props} />
      </WatchListProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.root.findAllByType(MovieCard).length).toBe(1);
  });

  it("Empty vote_average", async () => {
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
              vote_average: null,
            },
          ],
          total_pages: 1,
        },
      })
    );

    const component = create(
      <WatchListProvider>
        <NowPlaying {...props} />
      </WatchListProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.root.findAllByType(MovieCard).length).toBe(1);
  });
});

describe("Error API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Check the movie list", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );

    const component = create(
      <WatchListProvider>
        <NowPlaying {...props} />
      </WatchListProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.root.findAllByType(MovieCard).length).toBe(0);
  });
});
