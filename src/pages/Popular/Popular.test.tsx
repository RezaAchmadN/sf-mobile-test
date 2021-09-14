import React from "react";
import { act, cleanup, render } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import { POPULAR_MOVIE_LIST } from "../../services/tmdb";
import Popular from "./Popular";
import { WatchListProvider } from "../../stores/WatchListsStore";

const props = {
  navigation: {
    navigate: jest.fn(),
    setOptions: jest.fn(),
  },
} as any;

const mocks = [
  {
    request: {
      query: POPULAR_MOVIE_LIST,
      variables: { order: "asc", page: 1 },
    },
    result: {
      data: {
        Movies: {
          __typename: "Movies",
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
          total_pages: 2,
        },
      },
    },
  },
  {
    request: {
      query: POPULAR_MOVIE_LIST,
      variables: { order: "asc", page: 2 },
    },
    result: {
      data: {
        Movies: {
          __typename: "Movies",
          page: 2,
          results: [
            {
              __typename: "Movie",
              id: 605,
              title: "The Matrix Revolutions",
              overview:
                "The human city of Zion defends itself against the massive invasion of the machines as Neo fights to end the war at another front while also opposing the rogue Agent Smith.",
              poster_path: "/fgm8OZ7o4G1G1I9EeGcb85Noe6L.jpg",
              release_date: "2003-11-03",
              vote_average: 6.6,
            },
          ],
          total_pages: 2,
        },
      },
    },
  },
];

const networkErrorMocks = [
  {
    request: {
      query: POPULAR_MOVIE_LIST,
      variables: { page: 1 },
    },
    error: new Error("An error occurred"),
  },
];

describe("NowPlaying", () => {
  afterEach(cleanup);

  it("Testing the 'loading'", () => {
    const component = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Popular {...props} />
      </MockedProvider>
    );

    expect(component.getByTestId("loading")).toBeTruthy;
  });

  it("on Success", async () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WatchListProvider>
          <Popular {...props} />
        </WatchListProvider>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.getAllByTestId("MovieCard").length).toBe(2);
  });

  it("on Network Error", async () => {
    const component = render(
      <MockedProvider mocks={networkErrorMocks} addTypename={false}>
        <WatchListProvider>
          <Popular {...props} />
        </WatchListProvider>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(component.getByText("Error!")).toBeTruthy;
  });

  // it("onClicked", async () => {
  //   const component = render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <WatchListProvider>
  //         <Home {...props} />
  //       </WatchListProvider>
  //     </MockedProvider>
  //   );

  //   await act(async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   });
  //   component.debug()
  //   await fireEvent.press(await component.getByText("The Matrix Reloaded"))
  //   expect(component.getByText("Error!")).toBeTruthy;
  // });

  // it("on Scrolled", async () => {
  //   const component = render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <WatchListProvider>
  //         <Home {...props} />
  //       </WatchListProvider>
  //     </MockedProvider>
  //   );

  //   const eventData = {
  //     nativeEvent: {
  //       contentOffset: {
  //         y: 500,
  //       },
  //       contentSize: {
  //         // Dimensions of the scrollable content
  //         height: 500,
  //         width: 100,
  //       },
  //       layoutMeasurement: {
  //         // Dimensions of the device
  //         height: 100,
  //         width: 100,
  //       },
  //     },
  //   };

  //   await act(async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   });
  //   (await component.findByTestId("FlatList")).instance.end;

  //   const onEndReached = jest.fn();
  //   await component.debug()
  // });
});
