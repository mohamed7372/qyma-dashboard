import React from 'react'
import { Link } from 'react-router-dom'
import ArticleIcon from '../../assets/icons/article.svg'

const TopicCard = ({ item, grid = false }) => {
    return (
        <div>
            <div className={`bg-gray-800 rounded-xl p-4 flex items-center`}>
                <div className={`p-[6px] shadow-lg w-[70px] h-[70px] bg-[#ffffff40] rounded-full mr-6`}>
                    <img src={item.image} alt="" className='rounded-full h-full w-full object-cover' />
                </div>
                <div className={``}>
                    <Link to={`./${item._id}`}>
                        <h3 className='font-semibold text-md capitalize'>{item.title}</h3>
                    </Link>
                    <div className='flex items-center mt-2'>
                        <img src={ArticleIcon} alt="" className='w-4 mr-1' />
                        <p className='text-xs font-light'>{'???'} articles</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopicCard