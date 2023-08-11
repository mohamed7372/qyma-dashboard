import React from 'react'
import Badge from './Badge'
import { Link } from 'react-router-dom'

const PodcastCard = ({item}) => {
    return (
        <div className='w-full h-[200px] relative'>
            <img src={item.image} alt="" className='brightness-50 rounded-lg h-full w-full object-cover'/>
            <div className='mt-2'>
            </div>
            <div className='absolute left-4 top-4'>
                <Badge type={1} />
                <p className='capitalize font-medium'>episode #{item.episodeNumber}</p>
            </div>
            <div className='absolute left-4 bottom-4'>
                <Link to={`/topics/${item.category}`}>
                    <p className='font-light text-sm hover:text-primary-200'>{item.category}</p>
                </Link>
                <Link to={`./${item._id}`}>
                    <h3 className='font-semibold hover:underline'>{item.title}</h3>
                </Link>
            </div>
        </div>
    )
}

export default PodcastCard