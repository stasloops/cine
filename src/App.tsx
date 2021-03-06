import React, { useEffect, useState } from 'react';
import './App.scss'
import Header from './components/header/Header';
import List from './components/list/List';
import { Route, Routes } from 'react-router-dom';
import Anime from './components/anime/Anime';
import { useAppDispatch, UseAppSelector } from './hooks/redux-hooks/redux';
import { getAnime } from './store/reducers/Anime/AnimeGet';
import Search from './components/search/Search';

const App = () => {
  const dispatch = useAppDispatch()
  const [valueSearch, setValueSearch] = useState<string>('')
  const { page, params, loading } = UseAppSelector(state => state.anime)
  const [fetching, setFetching] = useState<boolean>(true)

  useEffect(() => {
      if (fetching) {
        dispatch(getAnime(page?.next_page, params?.valueSort, params?.valueGenres, params?.valueType, params?.valueYear))
        setFetching(false)
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e: any) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) <= 600) {
      // if(loading === false) {
        setFetching(true)
      // }
    }
  }

  useEffect(() => {
    console.log(fetching);
  }, [fetching])
  

  return (
    <div className="app">
      <div className='app__back'>
        <Header setValueSearch={setValueSearch} />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/search" element={<Search valueSearch={valueSearch} />} />
          <Route path="/anime/:id" element={<Anime />} />
          <Route path="*" element={<List />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;