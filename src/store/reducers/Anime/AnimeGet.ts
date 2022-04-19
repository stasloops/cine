import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAnime, fetchError, fetchLoading, fetchPage } from "./AnimeSlice";

export const getAnime = (page: undefined, valueSort: string, valueGenres: string, valueType: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetchLoading())
            const res = await axios.get(page === undefined ? `https://kodikapi.com/list?token=30ef128890b06e03700a3628b91c87c2&with_material_data=true&translation_id=609,739,2068&limit=28&sort=${valueSort}&anime_genres=${valueGenres}&anime_kind=${valueType}` : `${page}&with_material_data=true&translation_id=739,2068&limit=28&sort=${valueSort}&anime_genres=${valueGenres}&anime_kind=${valueType}`)
            dispatch(fetchAnime(res.data.results))
            dispatch(fetchPage(res.data))
            console.log(res.data);
            

        } catch (e) {
            dispatch(fetchError(e))
        }
    }
}

// with_material_data=true&translation_id=739,2068&limit=28&anime_kind=${valueType}&sort=${valueSort}&anime_genres=${valueGenres}