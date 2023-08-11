import React from 'react'
import { useEffect } from 'react'
import categoriesService from '../../services/categories'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const TopicsSection = () => {
    const [topics, setTopics] = useState([])
    
    useEffect(() => {
        categoriesService
            .getAll()
            .then(res => setTopics(res.categories))
    }, [])

    return (
        <div className='section'>
            <h1 className='font-extrabold capitalize text-xl md:text-3xl'>choose by topics</h1>
            <ul className='flex mt-10 flex-wrap justify-center'>
                {
                    topics.length > 0 && topics.map(item => 
                        <li key={item._id}>
                            <Link to={`/topics/${item._id}`}>
                                <p className='mr-3 md:mr-10 border rounded-full px-6 py-2 font-medium mb-4 md:mb-8 text-md hover:bg-primary-200 hover:text-gray-200'>{item.title}</p>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default TopicsSection