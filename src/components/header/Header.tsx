import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux-hooks/redux'
import { getSearchAnime } from '../../store/reducers/AnimeSearch/AnimeSearchGet'
import './Header.scss'

const Header:FC = () => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<string>('')
    const navigate = useNavigate()

    const onNavigateLogo = () => {
        navigate('/')
    }

    const onNavigateSearch = (e: any) => {
        if(value.length > 0){
            e.preventDefault()
            navigate('/search')
            dispatch(getSearchAnime(value))
            setValue('')
        }
    }
   
return (
<header className='header'>
    <div className='header__container'>
        <div className='header__inner'>
            <a className='header__logo' onClick={onNavigateLogo}>
                <span className='fff'>Anime</span>JoJo
            </a>
            <form className='header__form'>
                <input value={value} onChange={e => setValue(e.target.value)} placeholder='Поиск аниме' className='header__input'/>
                <button onClick={onNavigateSearch} className='header__button'></button>
            </form>
        </div>
    </div>
</header>
  )
}

export default Header