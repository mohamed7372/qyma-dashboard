import React, { forwardRef, useState } from 'react'
import IconPause from '../assets/icons/pause.svg'
import IconPlay from '../assets/icons/play.svg'
import IconNext from '../assets/icons/next.svg'
import IconPrev from '../assets/icons/previous.svg'
import { useDispatch, useSelector } from 'react-redux'
import { audioActions } from '../store/bussiness/audio-slice'
import Slider from '../components/form/Slider'
import { Link } from 'react-router-dom'

const MediaDetail = forwardRef(( props, ref) => {
    const episode = useSelector(state => state.episode.item)
    const statusEpisode = useSelector(state => state.episode.status)
    const currentTime = useSelector(state => state.audio.currentTime)
    const isPlaying = useSelector(state => state.audio.isPlaying)
    const percentage = useSelector(state => state.audio.percentage)
    const soundOn = useSelector(state => state.audio.soundOn)

    const dispatch = useDispatch()

    const play = () => {
        const audio = ref.current;
        audio.volume = soundOn

        if (!isPlaying) {
            dispatch(audioActions.replaceIsPlaying(true))
            audio.play()
        }
        if (isPlaying) {
            dispatch(audioActions.replaceIsPlaying(false))
            audio.pause()
        }
    }

    const onChange = (e) => {
        const audio = ref.current;
        audio.currentTime = (audio.duration / 100) * e.target.value
        dispatch(audioActions.replacePercentage(e.target.value))
        dispatch(audioActions.replaceCurrentTime(currentTime))
    }

    if (!statusEpisode)
        return null;
    
    return (
        <div className={`${!props.admin ? 'bg-gray-800' : 'bg-gray-700'} w-full z-10 py-3 px-4 rounded-lg`}>
            <h1 className='font-semibold text-lg text-center mb-4'>Now playing</h1>

            <img src={episode.image} alt="" className='w-full h-[100px] object-cover rounded-lg' />
            
            <div className='ml-4 flex flex-col items-center mt-2'>
                <h1 className='font-bold text-sm'>#{episode.episodeNumber} - {episode.title}</h1>
                <Link to={`../topics/${episode.category._id}`}>
                    <p className='font-light text-xs hover:text-primary-200'>{episode.category.title}</p>
                </Link>
            </div>

            
            <div className='mt-6'>
                <div className='w-full'>
                    <Slider percentage={percentage} onChange={onChange}/>
                </div>
                <div className='flex items-center justify-between mt-2'>
                    <p className='text-xs font-semibold'>{currentTime }</p>
                    <p className='text-xs font-semibold'>{episode.duration}</p>
                </div>
            </div>

            <div className='flex items-center justify-center mt-4 mb-2'>
                <button>
                    <img src={IconPrev} alt="" className='w-[18px]'/>
                </button>
                <button className='bg-primary-200 rounded-full p-2 mx-4' onClick={()=>play()}>
                    <img src={isPlaying ? IconPause : IconPlay} alt="" className='w-[20px]'/>
                </button>
                <button>
                    <img src={IconNext} alt="" className='w-[18px]'/>
                </button>
            </div>
        </div>
    )
})

export default MediaDetail