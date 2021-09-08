import { gql } from "@apollo/client";

const TMDBAPIKEY = "48367485a90367721f562c3532360bb3";

export const MOVIE_LIST = gql`
    query Movies {
      Movies(page: $page)
        @rest(
          type: "Movies"
          method: "GET"
          path: "discover/movie?page={args.page}&api_key=${TMDBAPIKEY}"
        ) {
        page 
        total_pages
        results {
          id
          title
          poster_path
          overview
          release_date
          vote_average
        }
      }
    }
  `;

export const POPULAR_MOVIE_LIST = gql`
    query Movies {
      Movies(order: $order, page: $page)
        @rest(
          type: "Movies"
          method: "GET"
          path: "discover/movie?sort_by=popularity.{args.order}&page={args.page}&api_key=${TMDBAPIKEY}"
        ) {
        page 
        total_pages
        results {
          id
          title
          poster_path
          overview
          release_date
          vote_average
        }
      }
    }
  `;

export const NOW_PLAYING_MOVIE_LIST = gql`
  query Movies {
    Movies(gte: $gte, lte: $lte, page: $page)
      @rest(
        type: "Movies"
        method: "GET"
        path: "discover/movie?primary_release_date.gte={args.gte}&primary_release_date.lte={args.lte}&page={args.page}&api_key=${TMDBAPIKEY}"
      ) {
      page 
      total_pages
      results {
        id
        title
        poster_path
        overview
        release_date
        vote_average
      }
    }
  }
`;

export const SEARCH_MOVIE = gql`
query Movies {
  Movies(searchQuery: $searchQuery, page: $page)
    @rest(
      type: "Movies"
      method: "GET"
      path: "search/movie?api_key=${TMDBAPIKEY}&query={args.searchQuery}&page={args.page}"
    ) {
    page
    total_pages
    results @type(name: "Movie") {
      id
      title
      overview
      poster_path
      release_date
      vote_average
    }
  }
}
`;
