import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, UseAppSelector } from '../../hooks/redux-hooks/redux'
import './List.scss'

const List:FC = () => {
  const { loading, anime } = UseAppSelector(state => state.anime)
  const [active, setActive] = useState(false)
  const [opacity, setOpacity] = useState(false)

  useEffect(() => {
    console.log(anime);
  }, [anime])

  const onScroll = () => {
    setActive(true)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    setTimeout(() => {
      setActive(false)
    }, 1000)
    
  }, [active])

  useEffect(() => {
    document.addEventListener('scroll', onTopScroll)
  return function () {
    document.removeEventListener('scroll', onTopScroll)
  }
  }, [])

  const onTopScroll = (e: any) => {
    if(e.target.documentElement.scrollTop > 500){
      setOpacity(true)
    }
    else{
      setOpacity(false)   
    }
  }
  

  return (
    <main className='list'>
      <img onClick={onScroll}style={{display: opacity === false ? 'none' : ''}}  className={active === false ? 'list__arrow' : 'list__arrow list__active'} src='arrow-svgrepo-com.svg' alt='scroll to top'/>
       <div className='list__container'>
          <div className='list__inner'>
            <h1 className='list__title'>Список аниме</h1>
            {
          loading === true ? 
            <h1 className='loading'>Loading...</h1>
            :
            <div className='list__cards'>
              {
            anime.map((item) => (
              <Link className='list__card' key={`${item.material_data.anime_title}_${item.id}`} to={`/anime/${item.material_data.title}/${item.id}`} >
                <img className='list__card-img' src={item.material_data.poster_url} />
                <div className='list__card-content'>
                  <h2 className='list__card-title'>{item.material_data.anime_title}</h2>
                  <span>
                    <span className='list__card-episodes'>{item.last_season} сезон </span>
                    <span className='list__card-episodes'>{item.last_episode} серии </span>
                  </span>
                </div>
              </Link>
            ))    
              }
            </div>
            }
          </div>
       </div>
    </main>
  )
}

export default List


