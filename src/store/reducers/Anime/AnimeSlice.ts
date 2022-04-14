import { createSlice } from "@reduxjs/toolkit";

type TypeInitialState = {
    anime: any[],
    page: any,
    loading: boolean,
    error: null,  
}

const initialState:TypeInitialState = {
    anime: [],
    page: [],
    loading: true,
    error: null,  
}

export const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        fetchLoading(state){
            state.loading = true
        },
        fetchAnime(state, action){
            state.loading = false
            state.anime = [...state.anime, ...action.payload]
        },
        fetchPage(state, action){
            state.page = action.payload
        },
        fetchError(state, action){
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { fetchLoading, fetchAnime, fetchError, fetchPage } = animeSlice.actions
export default animeSlice.reducer