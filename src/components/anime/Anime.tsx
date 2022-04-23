import React, { FC, useEffect, useState } from 'react'
import "./Anime.scss"
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Anime: FC = () => {
    const [searchAnime, setSearchAnime] = useState<any>([])
    const { id } = useParams<string>()

    useEffect(() => {
        const getAnime = async () => {
            try {
                const res = await axios.get(`https://kodikapi.com/search?token=30ef128890b06e03700a3628b91c87c2&id=${id}&with_material_data=true`)
                setSearchAnime(res.data.results[0])
            } catch (e) {
                console.log(e);
            }
        }
        getAnime()
    }, [id])

    useEffect(() => {
        console.log(searchAnime);
    }, [searchAnime])

    if (searchAnime.length === 0) {
        return null
    } else {
        return (<>
            <img src={searchAnime.material_data?.poster_url} className='anime__background' />
            <div className='anime'>
                <div className='anime__container'>
                    <div className='anime__inner'>
                        <div className='anime__info'>
                            <img className='anime__img' src={searchAnime.material_data?.poster_url} alt='anime poster' />
                            <div className='anime__content'>
                                <h1 className='anime__title'><span className='cae962'>{searchAnime.material_data?.title}</span> сезон {searchAnime.last_season}</h1>
                                <p className='anime__description'>{searchAnime.material_data?.anime_description}</p>
                                <div className='anime__genres'><span>Жанры: </span>
                                    <span>
                                        {
                                            searchAnime.material_data?.anime_genres.map((item: any) => (
                                                <>
                                                    <span className='anime__genres-item'>{item}</span><span className='anime__b'>,</span>
                                                </>
                                            ))
                                        }
                                    </span>
                                </div>
                                <span className='anime__year'>Год: {searchAnime.year}</span>
                            </div>
                        </div>
                        <strong className='anime__video-title'>Смотреть аниме «<span className='cae962'>{searchAnime.material_data?.title}</span>» онлайн</strong>
                        <iframe className='anime__video' src={searchAnime.link}
                            allow="autoplay; fullscreen"
                        ></iframe>
                    </div>
                </div>
            </div>
        </>)
    }
}

export default Anime