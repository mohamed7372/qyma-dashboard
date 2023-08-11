import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const BussinessRequestCard = ({item}) => {
    const pathUrl = window.location.pathname
    // const img = item.image ? item.image : require('../../assets/img/image_not_found.jpeg');
    const img = require('../../../assets/img/avatar-1.jpeg');

    return (
        // <div className={`bg-white rounded-xl overflow-hidden flex justify-between items-center p-4`}>
        <div className={`bg-primary-200 bg-opacity-20 rounded-xl p-4`}>
            <div className='flex items-center'>
                <div className='w-[40px] h-[40px] bg-primary-200 rounded-full flex justify-center items-center overflow-hidden'>
                    <img src={img} alt="" className='w-[80%] h-[80%] object-cover rounded-full'/>
                </div>
                <div className='pl-4 w-[80%]'>
                    <div className='col-span-4'>
                        <h1 className='text-sm font-semibold truncate w-full hover:underline '># props.item.episodeNumber </h1>
                        <p className='text-xs font-light w-fit'>rops.item.cat</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between mt-4'>
                <div className='font-medium cursor-pointer flex items-center justify-center rounded-lg px-3 py-2 bg-primary-200  text-white w-[45%]' onClick={()=>console.log('object')}>
                    <button>Confirm</button>
                </div>
                <div className='font-medium cursor-pointer flex items-center justify-center rounded-lg px-3 py-2 border border-primary-200 text-primary-200 w-[45%]' onClick={()=>console.log('object')}>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default BussinessRequestCard

