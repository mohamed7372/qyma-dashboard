import React from 'react'
import { Link } from 'react-router-dom'
import ClockIcon from '../../assets/icons/clock.svg'
import LoveIcon from '../../assets/icons/love.svg'
import LoveActifIcon from '../../assets/icons/love_actif.svg'

const ArticleCard = ({ item, grid = false }) => {
    const date = new Date(item.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const pathUrl = window.location.pathname;

    return (
        <div className={`${(pathUrl.includes('admin') || !grid) && 'mb-4'}`}>
            <div className={`h-full bg-gray-800 rounded-xl p-3 relative group ${!grid && 'flex items-center'} ${pathUrl.includes('admin') && 'border border-primary-50'}`}>
                <img src={LoveIcon} alt="" className={`absolute right-5 top-5 z-40 w-5 ${grid && 'hidden group-hover:block'}`}/>
                <div className={`relative h-fit ${!grid ? 'w-1/4 mr-4' : 'w-full'}`}>
                    <img src={require('../../assets/img/image 2.png')} alt="" className='h-[150px] w-full object-cover rounded-lg' />
                    <Link to={`/topics/${item._id}`}>
                        <p className=' text-xs font-semibold absolute left-3 bottom-3 bg-primary-100 text-gray-800 rounded-md px-3 py-1'>{item.category.title}</p>
                    </Link>
                </div>
                <div className={`${!grid ? 'w-3/4' : 'w-full'}`}>
                    <div className={`flex justify-between items-center ${grid && 'mt-2'}`}>
                        <div>
                            <div className='flex items-center mt-2'>
                                <img src={ClockIcon} alt="" className='w-[15px]'/>
                                <p className='text-xs ml-2 font-semibold text-'>{item.readTime} read</p>
                            </div>
                            <Link to={`/articles/${item._id}`}>
                                <h1 className='hover:underline text-md md:text-lg capitalize font-semibold truncate w-[250px] mt-1'>{'# ' + item.articleNumber + ' ' + item.title}</h1>
                            </Link>
                            <p className='text-sm mt-2'>{item.description}</p>
                        </div>
                    </div>
                    <div className='mt-4 flex items-center'>
                        <div className='w-[35px] h-[35px] bg-white rounded-full p-1'>
                            <img src={require('../../assets/img/avatar-1.jpeg')} alt="" className='w-full object-cover rounded-full' />
                        </div>
                        <div className='ml-3'>
                            <p className='text-sm font-medium'>Lorem, ipsum dolor.</p>
                            <p className='text-xs font-light'>{formattedDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard