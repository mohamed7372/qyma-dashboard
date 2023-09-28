import { Input, Select } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { filterActions } from '../../store/filter/filter-slice';

const SelectCustom = ({ title, children, data, item, setItem, showAll=false }) => {
    const dispatch = useDispatch();

    const handleChangeInput = e => {
        if (title === 'parent category') {
            dispatch(filterActions.replaceDataTopic(e.target.value ==='all' ? '' : e.target.value))
        }
    }
    
    return (
        <div className="relative">
            <div className="border border-primary-100 px-6 py-2 rounded-lg text-gray-600">
                <select variant='unstyled' className='text-sm my-1 w-full outline-none bg-transparent text-primary-100 capitalize' onChange={handleChangeInput}>
                    {!showAll && <option value={'all'} className='capitalize'>all</option>}
                    {
                        data.map( itemData => {
                            return(
                                <option value={itemData.id} key={itemData.id} className='capitalize text-black' selected={item === itemData.id}>{itemData.name}</option>
                            )
                        }
                        )
                    }
                </select>
            </div>
            <p className='absolute left-2 -top-2 text-xs font-semibold px-2 text-primary-100 capitalize rounded-md bg-primary-400'>{title}</p>
        </div>
    )
}

export default SelectCustom