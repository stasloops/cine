import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAnime, fetchError, fetchLoading } from "./AnimeSearchSlice";

export const getSearchAnime = (title: string) => {
    return async (dispatch: Dispatch) =>{
        try{
            dispatch(fetchLoading())
            const res = await axios.get(`https://kodikapi.com/search?token=30ef128890b06e03700a3628b91c87c2&title=${title}&types=anime-serial&translation_id=609&with_material_data=true`)
            dispatch(fetchAnime(res.data.results))
        }catch(e){
            dispatch(fetchError(e))
        }
    }
}





















