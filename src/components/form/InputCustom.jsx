import { Input } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { filterActions } from '../../store/filter/filter-slice';

const InputCustom = ({ title, type = 'date', placeholder, min, max, disabled = false, item, setItem }) => {
    const dispatch = useDispatch();

    const handleChangeInput = e => {
        if (type === 'date') {
            if(title === 'to')
                dispatch(filterActions.replaceDataTo(e.target.value))
            else if(title === 'from')
                dispatch(filterActions.replaceDataFrom(e.target.value))
        }
        else {
            setItem(e.target.value)
        }
    }

    return (
        <div className="relative">
            <div className="border border-primary-200 px-6 py-2 rounded-lg text-primary-100">
                <Input
                    placeholder={placeholder}
                    size="md"
                    type={type}
                    min={type ==='number' ? min : null}
                    max={type === 'number' ? max : null}
                    value={item}
                    onChange={handleChangeInput}
                    disabled={disabled}
                    variant='unstyled'
                    className="bg-primary-200 text-primary-100 w-full outline-none text-xs my-1"
                />
            </div>
            <p className='absolute left-2 -top-2 bg-secondary-200 text-xs font-semibold px-2 text-primary-100 capitalize'>{title}</p>
        </div>
    )
}

export default InputCustom