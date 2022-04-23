import { createSlice } from "@reduxjs/toolkit";

type TypeInitialState = {
    anime: any[],
    page: any, 
    loading: boolean,
    error: null,
    params: any,
}

const initialState: TypeInitialState = {
    anime: [],
    page: null,
    loading: false,
    error: null,
    params: {
        valueSort: 'shikimori_rating', valueGenres: '', valueType: 'tv'
    }
}

export const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        fetchLoading(state) {
            state.loading = true
        },
        fetchAnime(state, action) {
            state.loading = false
            state.anime = [...state.anime, ...action.payload]
        },
        resetAnime(state) {
            state.anime = []
        },
        getParams(state, action) {
            state.params = action.payload
        },
        fetchPage(state, action) {
            state.page = action.payload
        },
        fetchError(state, action) {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { getParams, resetAnime, fetchLoading, fetchAnime, fetchError, fetchPage } = animeSlice.actions
export default animeSlice.reducer