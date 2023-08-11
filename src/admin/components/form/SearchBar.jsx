import React from 'react'
import SearchIcon from '../../../assets/icons/search.svg'
import { useDispatch } from 'react-redux'
import { filterActions } from '../../../store/filter/filter-slice'

const SearchBar = () => {
    const dispatch = useDispatch()

    const handleChangeInput = (e) => {
        e.preventDefault();
        dispatch(filterActions.replaceDataSearch(e.target.value))
    }

    return (
        <form className='w-2/3 relative pl-4 pr-12 py-3 rounded-lg bg-primary-200 bg-opacity-20 flex items-center'>
            <input type="text" placeholder='Search...' className='text-xs bg-transparent outline-none text-white px-2 w-full ' onChange={handleChangeInput}/>
            <button className='absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg bg-primary-200 p-1 w-6 h-6' onClick={handleChangeInput}>
                <img src={SearchIcon} alt=""/>
            </button>
        </form>
    )
}

export default SearchBar