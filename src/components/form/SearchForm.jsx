import React from 'react'
import SearchIcon from '../../assets/icons/search.svg'
import { useDispatch } from 'react-redux'
import { filterActions } from '../../store/filter/filter-slice'

const SearchForm = () => {
    const dispatch = useDispatch()

    const handleChangeInput = (e) => {
        e.preventDefault();
        dispatch(filterActions.replaceDataSearch(e.target.value))
    }

    return (
        <form className='relative'>
            <input type="text" placeholder='search ...' className='w-full pl-6 pr-20 py-4 rounded-xl bg-gray-800 outline-none' onChange={handleChangeInput}/>
            <img src={SearchIcon} alt="" className='w-[30px] absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer' onClick={handleChangeInput}/>
        </form>
    )
}

export default SearchForm