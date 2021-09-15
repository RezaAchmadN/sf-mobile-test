/**
 * All The Interfaces !!
 */

export type Dispatch = React.Dispatch<IAction>;

export interface IFetch {
  data: any
  status: number
}

export interface IAction {
    type: string;
    payload: Array<IMovie> | any;
  }

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number | any;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date | any;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}