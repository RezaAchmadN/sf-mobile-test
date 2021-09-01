import React from 'react'
import { Store } from "../Store";
import { IMovieProps } from "../interfaces";
import { fetchDataAction, toogleFavAction } from "../Actions";
import { View, Text } from "react-native";

const MovieList = React.lazy<any>(() => import("../components/MovieList"));


export default function Home() {
    const { state, dispatch } = React.useContext(Store);

    React.useEffect(() => {
      state.movies.length === 0 && fetchDataAction(dispatch);
    });

    const props: IMovieProps = {
        movies: state.movies,
        store: { state, dispatch },
        toogleFavAction,
        favourites: state.favourites,
      };

    return (
        <React.Fragment>
            <React.Suspense fallback={<Text>loading...</Text>}>
                <View>
                    <MovieList {...props} />
                </View>
            </React.Suspense>
        </React.Fragment>
    )
}
