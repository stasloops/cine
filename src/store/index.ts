import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AnimeSlice from "./reducers/Anime/AnimeSlice";
import AnimeSearchSlice from "./reducers/AnimeSearch/AnimeSearchSlice";

const rootReducer = combineReducers({
    anime: AnimeSlice,
    animeSearch: AnimeSearchSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']