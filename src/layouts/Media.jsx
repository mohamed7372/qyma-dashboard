import React, { forwardRef, useState } from 'react'
import IconPause from '../assets/icons/pause.svg'
import IconPlay from '../assets/icons/play.svg'
import IconNext from '../assets/icons/next.svg'
import IconPrev from '../assets/icons/previous.svg'
import IconRefresh from '../assets/icons/refresh.svg'
import IconLove from '../assets/icons/love.svg'
import IconLoveActif from '../assets/icons/love_actif.svg'
import IconSound from '../assets/icons/sound.svg'
import IconUnsound from '../assets/icons/unsound.svg'
import { useDispatch, useSelector } from 'react-redux'
import { audioActions } from '../store/bussiness/audio-slice'
import Slider from '../components/form/Slider'


const Media = forwardRef((props, ref) => {
    const [love, setLove] = useState(false);
    const [replay, setReplay] = useState(false);
    // const [play, setPlay] = useState(true);

    const dispatch = useDispatch()

    const isPlaying = useSelector(state => state.audio.isPlaying)
    const currentTime = useSelector(state => state.audio.currentTime)
    const duration = useSelector(state => state.audio.duration)
    const title = useSelector(state => state.audio.title)
    const topic = useSelector(state => state.audio.topic)
    const soundOn = useSelector(state => state.audio.soundOn)
    const percentage = useSelector(state => state.audio.percentage)

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

    const toggleSound = () => {
        const audio = ref.current;
        if (soundOn === 1) {
            dispatch(audioActions.replaceSoundOn(0))
            audio.volume = 0
        }
        if (soundOn === 0) {
            dispatch(audioActions.replaceSoundOn(1))
            audio.volume = 1
        }
    }

    const onChange = (e) => {
        const audio = ref.current;
        audio.currentTime = (audio.duration / 100) * e.target.value
        dispatch(audioActions.replacePercentage(e.target.value))
        dispatch(audioActions.replaceCurrentTime(currentTime))
    }

    return (
        <div className="fixed bottom-4 z-10 w-full">
            <div className='responsive'>
                <div className='bg-[#2f4266] w-full z-10 grid grid-cols-12 py-3 px-8 rounded-lg'>

                    <div className='col-span-5 flex items-center justify-between'>
                        <div className='flex items-center'>
                            <div className='rounded-full bg-gray-300 w-[55px] h-[55px] flex justify-center items-center'>
                                <img src={require('../assets/img/image 5.png')} alt="" className='w-[45px] h-[45px] object-cover rounded-full'/>
                            </div>
                            <div className='ml-4'>
                                <h1 className='font-bold text-sm  truncate w-[240px]'>{title}</h1>
                                <p className='font-light text-xs'>{topic}</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-end'>
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


                    <div className='flex items-center justify-center'>
                        <button onClick={()=>setReplay(!replay)}>
                            {replay
                                ? <img src={IconRefresh} alt="" className='w-[20px]'/>
                                : <p className='rounded-lg border border-white font-bold text-xs px-2 py-1'>1</p>
                            }
                        </button>
                    </div>

                    <div className='flex items-center col-span-5 px-4'>
                        <p className='text-xs font-semibold'>{currentTime}</p>
                        {/* <div className='w-full h-1 rounded-full mx-4 bg-primary-200'> */}
                        <div className='w-full h-10 flex items-center px-2'>
                            <Slider percentage={percentage} onChange={onChange}/>
                        </div>
                        <p className='text-xs font-semibold'>{duration }</p>
                    </div>

                    <div className='col-span-1 flex items-center justify-between ml-5'>
                        <button onClick={()=>setLove(!love)}>
                            <img src={love ? IconLoveActif : IconLove} alt="" className='w-[20px]'/>
                        </button>
                        <button onClick={()=>toggleSound()}>
                            <img src={soundOn === 1 ? IconSound : IconUnsound} alt="" className='w-[20px]'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Media