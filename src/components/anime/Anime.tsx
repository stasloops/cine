import React, { FC, useEffect, useState } from 'react'
import "./Anime.scss"
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Anime:FC = () => {
    const [searchAnime, setSearchAnime] = useState<any>([])

    const { id } = useParams()

    useEffect(():any => {
        console.log(id);
        const getAnime = async () => {
            try{
                const res = await axios.get(`https://kodikapi.com/search?token=30ef128890b06e03700a3628b91c87c2&id=${id}&with_material_data=true`)
                console.log(res.data);
                
                setSearchAnime(res.data.results)
            }catch(e){
                console.log(e);
            }
        }
        getAnime()
    }, [id])

  useEffect(() => {
    console.log(searchAnime);
  }, [searchAnime])
  
if(searchAnime.length === 0){
    return null
}else{
    return (<>
    <img src={searchAnime[0].material_data.poster_url} className='anime__background'  />
    <div className='anime'>
        <div className='anime__container'>
            <div className='anime__inner'>
                <div className='anime__info'>
                    <img className='anime__img' src={searchAnime[0].material_data.poster_url}/>
                    <div className='anime__content'>
                        <h1 className='anime__title'>{searchAnime[0].material_data.title}</h1>
                        <span className='anime__episode'>{searchAnime[0].last_season} сезон </span>
                        <span className='anime__episode-green'>{searchAnime[0].last_episode} серий</span>
                        <p className='anime__description'>{searchAnime[0].material_data.anime_description}</p>
                        <span className='anime__year'>Год: {searchAnime[0].year}</span>
                    </div>
                </div>
                <strong className='anime__video-title'>Смотреть аниме <span className='cae962'>«{searchAnime[0].material_data.title}»</span> онлайн</strong>
                <iframe className='anime__video' src={searchAnime[0].link}
                        allow="autoplay; fullscreen"
                ></iframe>
            </div>
        </div>
    </div>
  </>)
}
}

export default Anime