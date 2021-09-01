import React from 'react'
import { IState, IAction } from "./interfaces";


const initialState: IState = {
    movies: [],
    favourites: []
}

export const Store = React.createContext<IState | any>(initialState)

function reducer(state: IState, action: IAction):IState {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, movies: action.payload.results}
        case 'ADD_FAV':
            return { ...state, favourites: [...state.favourites, action.payload]}
        case 'REMOVE_FAV':
            return { ...state, favourites: action.payload}
        default:
            return state
    }
}

export function StoreProvider({ children }: JSX.ElementChildrenAttribute): JSX.Element {
    const [state, dispatch] = React.useReducer(reducer, initialState) 
    return <Store.Provider value={{state, dispatch}}>{ children }</Store.Provider>
}