import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAnime, fetchError, fetchLoading, fetchPage } from "./AnimeSlice";

export const getAnime = (page: any) => {
    return async (dispatch: Dispatch) =>{
        try{
            const res = await axios.get(page === undefined ? `https://kodikapi.com/list?token=30ef128890b06e03700a3628b91c87c2&with_material_data=true&types=anime-serial&sort=shikimori_rating&translation_id=739,2068&limit=28` : `${page}&with_material_data=true&types=anime-serial&sort=shikimori_rating&translation_id=739,2068&limit=28`)
            dispatch(fetchAnime(res.data.results))
            dispatch(fetchPage(res.data))
            console.log(res.data);
        }catch(e){
            dispatch(fetchError(e))
        }
    }
}
