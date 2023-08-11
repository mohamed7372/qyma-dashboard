import React, { forwardRef, useEffect, useRef, useState } from 'react'
import ClockIcon from '../../assets/icons/clock.svg'
import LoveIcon from '../../assets/icons/love.svg'
import LoveActifIcon from '../../assets/icons/love_actif.svg'
import PlayIcon from '../../assets/icons/play.svg'
import PauseIcon from '../../assets/icons/pause.svg'
import { Link } from 'react-router-dom'
import episodeService from '../../services/episode'
import { useDispatch, useSelector } from 'react-redux'
import { audioActions } from '../../store/bussiness/audio-slice'

const PodcastCard = forwardRef((props, ref) => {
    const show = props.show ? false : true

    const pathUrl = window.location.pathname
    // const img = item.image ? item.image : require('../../assets/img/image_not_found.jpeg');
    const img = require('../../assets/img/image 5.png');
    return (
        <div className={`bg-gray-800 rounded-xl overflow-hidden flex justify-between items-center p-4 ${pathUrl.includes('admin') && 'border border-primary-50'}`}>
            <div className='w-[100px]'>
                <div className='w-[80px] h-[80px] bg-gray-700 rounded-full flex justify-center items-center overflow-hidden'>
                    <img src={img} alt="" className='w-[80%] h-[80%] object-cover rounded-full'/>
                </div>
            </div>
            <div className='pl-8 grid grid-cols-6 w-[95%]'>
                <div className='col-span-4'>
                    <Link to={`/podcasts/archives/${props.item._id}`}>
                        <h1 className='text-md md:text-lg font-semibold truncate w-[250px] hover:underline'># {props.item.episodeNumber} - {props.item.title}</h1>
                    </Link>
                    <p className='text-xs md:text-sm font-light w-fit'>{props.item.category.title}</p>
                    <div className='flex items-center mt-2'>
                        <img src={ClockIcon} alt="" className='w-[15px]'/>
                        <p className='text-xs ml-2 text-primary-50'>{props.item.duration}</p>
                    </div>
                </div>
                {show &&
                    <Actions id={props.item._id} ref={ref} title={`#${props.item.episodeNumber} - ${props.item.title}`} topic={props.item.category.title} duration={props.item.duration} idAudio={props.audio} />
                }
            </div>
        </div>
    )
})

export default PodcastCard

const Actions = forwardRef((props, ref) => {
    const [love, setLove] = useState(false);

    const dispatch = useDispatch()
    
    const isPlaying = useSelector(state => state.audio.isPlaying)
    const soundOn = useSelector(state => state.audio.soundOn)
    const audioStore = useSelector(state => state.audio.audio)
    const titleStore = useSelector(state => state.audio.title)
    
    const play = () => {
        const audio = ref.current;
        audio.volume = soundOn
        
        // dispatch(audioActions.replaceAudio('https://res.cloudinary.com/dhf83aynm/video/upload/v1690041255/h3tulchgargwquxubeee.mp3'));  
        if (props.title === titleStore) {
            console.log('same');
            if (!isPlaying) {
                dispatch(audioActions.replaceIsPlaying(true))
                audio.play()
            }
            if (isPlaying) {
                dispatch(audioActions.replaceIsPlaying(false))
                audio.pause()
            }
        }
        else {
            console.log('not same');
            dispatch(audioActions.clearData());    
            episodeService
            .get(props.id)
            .then(res => {
                dispatch(audioActions.replaceAudio(res.episode.audio));    
            })
            dispatch(audioActions.replaceTitle(props.title))
            dispatch(audioActions.replaceTopic(props.topic))
            dispatch(audioActions.replaceDuration(props.duration))
            dispatch(audioActions.replaceIsPlaying(true))
            audio.currentTime = 0
            audio.play()
        }
        
        
    }

    // console.log('res', titleStore, props.title);
    return (
        <div className='flex items-center col-span-2 justify-end'>
            <div className='cursor-pointer flex items-center justify-center border border-gray-300 rounded-full p-3 mr-4' onClick={()=>play()}>
                <img src={ isPlaying && titleStore && titleStore === props.title ? PauseIcon : PlayIcon} alt="" className='w-[20px]'/>
            </div>
            <div className='cursor-pointer flex items-center justify-center border border-gray-300 rounded-full p-3' onClick={()=>setLove(!love)}>
                {love
                    ? <img src={LoveActifIcon} alt="" className='w-[20px]' />
                    : <img src={LoveIcon} alt="" className='w-[20px]' />
                }
            </div>
        </div>
    )
})