import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UseAppSelector } from '../../hooks/redux-hooks/redux'

const Search:FC = () => {

  const { animeSearch, loadingSearch } = UseAppSelector(state => state.animeSearch)

  useEffect(() => {
    console.log(animeSearch);
    
  }, [animeSearch])
  
  return (
    <main className='list'>
       <div className='list__container'>
          <div className='list__inner'>
            <h1 className='list__title'>Найдено аниме: {animeSearch.length}</h1>
            {
          loadingSearch === true ? 
            <h1 className='loading'>Loading...</h1>
            :
            <div className='list__cards'>
              {
            animeSearch.map((item) => (
              <Link className='list__card' key={`${item.material_data.anime_title}_${item.id}`} to={`/anime/${item.material_data.title}/${item.id}`} >
                <img className='list__card-img' src={item.material_data.poster_url} />
                <div className='list__card-content'>
                  <h2 className='list__card-title'>{item.material_data.anime_title}</h2>
                  <span className='list__card-episodes'>{item.last_season} сезон </span>
                  <span className='list__card-episodes'>{item.last_episode} серии </span>
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

export default Search