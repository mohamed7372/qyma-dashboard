import { Input, Select } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { filterActions } from '../../store/filter/filter-slice';

const SelectCustom = ({ title, children, data, item, setItem, showAll=false }) => {
    const dispatch = useDispatch();

    const handleChangeInput = e => {
        if (title === 'duration') {
            dispatch(filterActions.replaceDataDuration(e.target.value === 'all' ? '' : e.target.value))
        }
        else if (title === 'topics') {
            dispatch(filterActions.replaceDataTopic(e.target.value ==='all' ? '' : e.target.value))
        }
        else if (title === 'status') {
            dispatch(filterActions.replaceDataStatus(e.target.value === 'all' ? '' : e.target.value))
        }
        else if (title === 'topic') {
            setItem(e.target.value)
        }
    }

    // console.log(object);
    return (
        <div className="relative">
            <div className="border border-primary-200 px-6 py-2 rounded-lg text-primary-100">
            {/* <div className="border px-6 py-2 rounded-lg text-gray-600"> */}
                <select variant='unstyled' defaultValue={'test'} className='text-sm my-1 w-full outline-none bg-secondary-200 text-primary-100 capitalize' onChange={handleChangeInput}>
                    {!showAll && <option value={'all'} className='capitalize'>all</option>}
                    {
                        data.map((itemData, idx) => {
                            return(
                                <option value={itemData._id} key={itemData._id} className='capitalize' selected={item === itemData._id}>{itemData.title}</option>
                            )
                        }
                        )
                    }
                </select>
            </div>
            <p className='absolute left-2 -top-2 bg-secondary-200 text-xs font-semibold px-2 text-primary-100 capitalize'>{title}</p>
        </div>
    )
}

export default SelectCustom