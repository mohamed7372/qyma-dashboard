import React, { useState } from 'react'
import Card from './Card'
import IconPlay from '../../assets/icons/play.svg'
import IconPause from '../../assets/icons/pause.svg'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import episodeService from '../../services/episode'
import { Link } from 'react-router-dom'

const EpisodeSection = () => {
    const [trending, setTrending] = useState([])

    useEffect(() => {
        episodeService
            .getMostPlayed(4)
            .then(res => setTrending(res.episodes))
    }, [])

    return (
        <div className='section'>
            <h1 className='title-section'>most downloaded episodes</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-8 mt-10'>
                {
                    trending.length > 0 && trending.map(episode =>
                        <Card bgImg={episode.image} css={'h-[110px] md:h-[260px] w-full flex items-center'} pos='bottom-0' key={episode._id}>
                            <EpisodeItem episode={episode}/>
                        </Card>
                    )
                }
            </div>
        </div>
    )
}

export default EpisodeSection

const EpisodeItem = ({ episode }) => {
    const [play, setPlay] = useState(false)

    return (
        <div className='flex items-center'>
            <div className='bg-primary-200 flex items-center justify-center rounded-full p-4 mr-4 cursor-pointer' onClick={()=>setPlay(!play)}>
                <img src={play ? IconPause : IconPlay} alt="" className=' w-[20px]'/>
            </div>
            <div>
                <Link to={`./podcasts/archives/${episode._id}`}>
                    <h3 className='hover:underline font-bold capitalize text-md md:text-xl mb-1 text-gray-200'>{episode.title}</h3>
                </Link>
                <p className='capitalize text-xs md:text-sm text-gray-300'>episode #{episode.episodeNumber}</p>
            </div>
        </div>
    )
}