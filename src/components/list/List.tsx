import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UseAppSelector } from '../../hooks/redux-hooks/redux'
import Filters from '../filters/Filters'
import './List.scss'
import arrow from "../../icons/arrow.svg"

const List: FC = () => {
  const { loading, anime } = UseAppSelector(state => state.anime)
  const [opacity, setOpacity] = useState<boolean>(false)
  const [newAnime, setNewAnime] = useState<any[]>([])

  const onScroll = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    document.addEventListener('scroll', onTopScroll)
    return function () {
      document.removeEventListener('scroll', onTopScroll)
    }
  }, [])

  const onTopScroll = (e: any) => {
    if (e.target.documentElement.scrollTop > 500) {
      setOpacity(true)
    }
    else {
      setOpacity(false)
    }
  }

  useEffect(() => {
    let dataMap: any = new Map();
    anime.forEach((p: any) => dataMap.set(p.worldart_link, p));
    setNewAnime([...dataMap.values()])
  }, [anime])

  return (
    <main className='list'>
      <img onClick={onScroll} style={{ display: opacity === false ? 'none' : '' }} className='list__arrow' src={arrow} alt='scroll to top' />
      <div className='list__container'>
        <img className='list__jojo-img' src='/img/jojo2.jpg' />
        <div className='list__inner'>
          <h1 className='list__title'>Список аниме</h1>
          <Filters />
          {
            <div className='list__cards'>
              {
                newAnime.map((item) => (
                  <Link className='list__card' key={`${item.id}`} to={`/anime/${item.id}`} >
                    <img className='list__card-img' src={item.material_data?.poster_url} alt='anime poster' />
                    <div className='list__card-content'>
                      <h2 className='list__card-title'>{item.material_data?.anime_title}</h2>
                      <span>
                        <span className='list__card-episodes'>{item.last_season === undefined ? "" : item.last_season + " сезон"} </span>
                        <span className='list__card-episodes'>{item.material_data?.anime_kind === "movie" ? "Фильм" : item.material_data?.anime_kind === 'tv' ? 'TV сериал' : item.material_data?.anime_kind === 'ova' ? 'OVA' : 'Спешл'}</span>
                      </span>
                    </div>
                  </Link>
                ))
              }
            </div>
          }
          {loading === true ?
            <h1 className='loading'>Loading...</h1>
            :
            null
          }
        </div>
        <img className='list__dio-img' src='/img/dio2.jpg' />
      </div>
    </main>
  )
}

export default List


