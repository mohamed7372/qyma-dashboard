import React, { useEffect, useState } from 'react'
import GridIcon from '../assets/icons/grid.svg'
import ListIcon from '../assets/icons/list_bullet.svg'
import InputCustom from '../components/form/InputCustom'
import SelectCustom from '../components/form/SelectCustom'
// import { Select } from '@chakra-ui/react'
import categoriesService from '../services/categories'

const Filter = ({ gridDisplay, setGridDisplay }) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        categoriesService
            .getAll()
            .then(res => setCategories(res.categories))
            .catch(err=> console.log(err))
    })

    const dataDuration = [
        {_id:0,title:'under 30 min' },
        {_id:1,title:'between 30 min - one hour'},
        {_id:2,title: 'over one hour' }
    ]

    return (
        <div className='flex items-center rounded-xl bg-gray-800 mt-6 px-6 py-4 '>
            <div className='hidden md:grid grid-cols-12 gap-x-8 w-full'>
                <div className='flex flex-col col-span-3'>
                    <InputCustom title={'from'}/>
                </div>
                <div className='flex flex-col col-span-3'>
                    <InputCustom title={'to'}/>
                </div>
                <div className='flex flex-col col-span-3'>
                    <SelectCustom title={'duration'} data={dataDuration}/>
                </div>
                <div className='flex flex-col col-span-3'>
                    <SelectCustom title={'topics'} data={categories}/>
                </div>

            </div>
            <div className='flex items-center justify-end ml-8'>
                <div className={`${!gridDisplay && 'bg-primary-200 bg-opacity-40 rounded-xl'} p-2 mr-4`}>
                    <img src={ListIcon} alt="" onClick={() => setGridDisplay(false)} className='cursor-pointer w-[30px]'/>
                </div>
                <div className={`${gridDisplay && 'bg-primary-200 bg-opacity-40 rounded-xl'} p-2`}>
                    <img src={GridIcon} alt="" onClick={() => setGridDisplay(true)} className='cursor-pointer w-[30px]'/>
                </div>
            </div>
        </div>
    )
}

export default Filter