import React, { FC, useEffect, useState } from 'react'
import './Filters.scss'
import { useAppDispatch } from '../../hooks/redux-hooks/redux'
import { getAnime } from '../../store/reducers/Anime/AnimeGet'
import { fetchPage, getParams, resetAnime } from '../../store/reducers/Anime/AnimeSlice'
import { filterDataGenres, filterDataType, filterDataSort, filterDataYear } from './filter-data'
import Genre from '../genre/Genre'


const Filters: FC = () => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<any>({ valueSort: 'shikimori_rating', valueGenres: '', valueType: 'tv', valueYear: '' })
    const [genre, setGenre] = useState<string>('')
    const [activeGenre, setActiveGenre] = useState<any[]>([])

    const handleGenre = (gen: any) => {
        const index = activeGenre.findIndex((ele: any) => ele === gen)
        if (index === -1) {
            setActiveGenre([...activeGenre, gen])
        }
        else {
            activeGenre.splice(index, 1)
            setGenre(activeGenre.join(','))
        }
    }
    
    useEffect(() => {
       setGenre(activeGenre.join(','))
    }, [activeGenre])

    useEffect(() => {
        setValue({ ...value, valueGenres: genre })
    }, [genre])
    
    useEffect(() => {
        if (value) {
            dispatch(resetAnime())
            dispatch(fetchPage(undefined))
            dispatch(getAnime(undefined, value?.valueSort, value?.valueGenres, value?.valueType, value?.valueYear))
        }
    }, [value])

    useEffect(() => {
        dispatch(getParams(value))
    }, [value])

    return (
        <div className='filters'>
            <div className='filters__inner'>
                <h3 className='filters__title'>Фильтры</h3>
                <form className='filters__genres'>
                    <div className='filters__left'>
                        <label className='filters__left-item'>
                            <h5 className='filters__genres-title'>Сортировка по</h5>
                            <select value={value.valueSort} onChange={e => setValue({ ...value, valueSort: e.target.value })} className='filters__sort'>
                                {
                                    filterDataSort.map((item, id) => (
                                        <option key={id} value={item.value} className='filters__sort-item'>
                                            {item.label}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>
                        <label className='filters__left-item'>
                            <h5 className='filters__genres-title'>Тип</h5>
                            <select value={value.valueType} onChange={e => setValue({ ...value, valueType: e.target.value })} className='filters__sort'>
                                <option value='' className='filters__sort-item'>
                                    Все типы
                                </option>
                                {
                                    filterDataType.map((item, id) => (
                                        <option key={id} value={item.value} className='filters__sort-item'>
                                            {item.label}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>
                        <label className='filters__left-item'>
                            <h5 className='filters__genres-title'>Год</h5>
                            <select value={value.valueYear} onChange={e => setValue({ ...value, valueYear: e.target.value })} className='filters__sort'>
                                <option value='' className='filters__sort-item'>
                                    Год
                                </option>
                                {
                                    filterDataYear.map((item, id) => (
                                        <option key={id} value={item.value} className='filters__sort-item'>
                                            {item.value}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>
                    </div>
                    <label className='filters__genres-content'>
                        <h5 className='filters__genres-title'>Жанры</h5>
                        <div className='filters__genre'>
                            {
                                filterDataGenres.map((item, id) => (
                                    <Genre handleGenre={handleGenre} key={id} item={item} />
                                ))
                            }
                        </div>
                    </label>
                </form>
            </div>
        </div >
    )
}

export default Filters