import React from 'react'
import SearchIcon from '../../assets/icons/search.svg'
import CloseIcon from '../../assets/icons/close.svg'
import { useDispatch, useSelector } from 'react-redux'
import { filterActions } from '../../store/filter/filter-slice'

const SearchForm = () => {
    const dispatch = useDispatch()

    const handleChangeInput = (e) => {
        e.preventDefault();
        dispatch(filterActions.replaceDataSearch(e.target.value))
    }

    const handleClearInput = (e) => {
        e.preventDefault();
        dispatch(filterActions.replaceDataSearch(''))
    }

    const data = useSelector(state => state.filter.search);
    console.log(data);

    return (
        <form className='relative'>
            <input type="text" placeholder='search ...' value={data} className='w-full pl-6 pr-20 py-4 rounded-xl bg-gray-800 outline-none' onChange={handleChangeInput} />
            {
                data
                    ? <img src={CloseIcon} alt="" className='w-[20px] md:w-[25px] absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer' onClick={handleClearInput}/>
                    : <img src={SearchIcon} alt="" className='w-[20px] md:w-[25px] absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer' onClick={handleChangeInput}/>
            }
        </form>
    )
}

export default SearchForm