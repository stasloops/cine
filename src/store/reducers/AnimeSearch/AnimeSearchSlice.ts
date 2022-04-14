import { createSlice } from "@reduxjs/toolkit";

type TypeInitialState = {
    animeSearch: any[],
    loadingSearch: boolean,
    errorSearch: null,  
}

const initialState:TypeInitialState = {
    animeSearch: [],
    loadingSearch: false,
    errorSearch: null,  
}

export const animeSearchSlice = createSlice({
    name: 'animeSearch',
    initialState,
    reducers: {
        fetchLoading(state){
            state.loadingSearch = true
        },
        fetchAnime(state, action){
            state.loadingSearch = false
            state.animeSearch = action.payload
        },
        fetchError(state, action){
            state.loadingSearch = false
            state.errorSearch = action.payload
        }
    }
})

export const { fetchLoading, fetchAnime, fetchError } = animeSearchSlice.actions
export default animeSearchSlice.reducer