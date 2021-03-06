import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UseAppSelector } from '../../hooks/redux-hooks/redux'

type SearchProps = {
  valueSearch: string
}
const Search: FC<SearchProps> = ({ valueSearch }) => {
  const [newAnimeSearch, setNewAnimeSearch] = useState<any[]>([])
  const { animeSearch, loadingSearch } = UseAppSelector(state => state.animeSearch)

  useEffect(() => {
    let cityMap: any = new Map();
    animeSearch.forEach(p => cityMap.set(p.worldart_link, p));
    setNewAnimeSearch([...cityMap.values()])
  }, [animeSearch])

  return (
    <main className='list'>
      <div className='list__container'>
        <div className='list__inner'>
          <div className='list__search'>
            <h6 className='list__result-search'>{valueSearch.length === 0 ? null : 'Результат поиска: ' + valueSearch}</h6>
            <h6 className='list__result'>{newAnimeSearch.length === 0 ? null : 'Результатов: ' + newAnimeSearch.length}</h6>
          </div>
          {
            loadingSearch === true ?
              <h1 className='loading'>Loading...</h1>
              :
              <div className='list__cards'>
                {
                  newAnimeSearch.length === 0 ?
                    <h2 className='fff pad'>Попробуйте ввести название аниме по-другому. В случае, если вам все равно не удалось найти нужное вам аниме, напишите мне.</h2>
                    :
                    newAnimeSearch?.map((item) => (
                      <Link className='list__card' key={`${item.id}`} to={`/anime/${item.id}`} >
                        <img className='list__card-img' src={item.material_data?.poster_url} alt='anime poster'/>
                        <div className='list__card-content'>
                          <h2 className='list__card-title'>{item.material_data?.anime_title}</h2>
                          <span className='list__card-episodes'>{item.last_season === undefined ? "" : item.last_season + " сезон"} </span>
                          <span className='list__card-episodes'>{item.material_data?.anime_kind === "movie" ? "Фильм" : item.material_data?.anime_kind === 'tv' ? 'TV сериал' : item.material_data?.anime_kind === 'ova' ? 'OVA' : 'Спешл'}</span>
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