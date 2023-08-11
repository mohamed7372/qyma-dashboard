import React, { forwardRef, useEffect, useRef, useState } from 'react'
import NavBar from '../layouts/NavBar'
import Card from '../components/ui/Card'
import CustomButton from '../components/form/CustomButton'
import PodcastPlatform from '../components/ui/PodcastPlatform'
import PodcastCard from '../components/ui/PodcastCard'
import { Link } from 'react-router-dom'
import Footer from '../layouts/Footer'
import Subscribe from '../components/ui/Subscribe'
import { useDispatch, useSelector } from 'react-redux'
import episodeService from '../services/episode'
import { listEpisodeActions } from '../store/bussiness/list-bussiness-slice'
import Media from '../layouts/Media'
import { audioActions } from '../store/bussiness/audio-slice'

const Podcast = () => {
    const dispatch = useDispatch();
    const audioRef = useRef()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        episodeService
            .getAll()
            .then((res) => {
                dispatch(listEpisodeActions.replaceData(res.episodes.slice(0,6)));    
                dispatch(listEpisodeActions.dataLoading());    
            }).catch((err) => {
                console.log(err);                
            });
    }, [dispatch])

    const audio = useSelector(state => state.audio.audio)

    const getCurrDuration = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const time = e.currentTarget.currentTime

        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        
        dispatch(audioActions.replacePercentage(+percent))
        dispatch(audioActions.replaceCurrentTime(`${hours}:${minutes}:${seconds}`))
    }

    return (
        <div className=' min-h-screen'>
            <nav>
                <NavBar/>
            </nav>

            <main className='responsive pt-40 pb-20'>
                <Header/>

                <div className='mt-10'>
                    <h1 className='text-xl font-bold mb-4'>Subscribe on the platform of your choice:</h1>
                    <PodcastPlatform css='w-2/3'/>
                </div>

                <p className='mt-8'>Want to view all past podcasts on a single page?
                    <Link to='./archives'>
                        <span className='text-primary-200 ml-1'>View our podcast archive</span>
                    </Link>
                </p>

                <TrendingPodcast ref={audioRef} />
                <RecentPodcast ref={audioRef} />
                <Subscribe />
                
            </main>

            <footer>
                <Footer/>
            </footer>

            {audio && <Media ref={audioRef} />}
            
            {
                <audio
                    ref={audioRef}
                    onTimeUpdate={getCurrDuration}
                    // onLoadedData={(e) => {
                    //     setDuration(e.currentTarget.duration.toFixed(2))
                    // }}
                    src={audio}
                ></audio>
            }
        </div>
    )
}

export default Podcast

const Header = () => {
    return (
        <Card css={'h-[300px]'} bgImg=''>
            <div className='flex items-center'>
                <img src={require('../assets/img/image 2.png')} alt="" className='h-[250px] w-1/3 object-cover rounded-lg'/>
                <div className='pl-8'>
                    <h1 className='text-xl font-bold mb-2'>Lorem, ipsum dolor.</h1>
                    <p className='text-sm font-light mb-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur nam quis tempora est! Expedita, vitae similique reprehenderit minima quis unde porro ipsam beatae quisquam fuga possimus dolore, repellat hic praesentium eligendi totam distinctio non? Necessitatibus ut minima praesentium odio.</p>
                    <CustomButton name={'lorme'} css={'px-4 py-2'}/>
                </div>
            </div>
        </Card>
    )
}

const RecentPodcast = forwardRef((props, ref) => {
    const listEpisode = useSelector(state => state.listEpisode.itemsList)
    const statusListEpisode = useSelector(state => state.listEpisode.status)

    return (
        <div className='section'>
            <h1 className='title-section'>recent podcasts</h1>
            <div className="grid grid-cols-2 gap-x-16 gap-y-6 mt-10">
                {
                    statusListEpisode && listEpisode.length > 0 &&
                    listEpisode.map(item => 
                        <PodcastCard key={item._id} item={item} ref={ref} />
                    )
                }
            </div>

            <p className='text-center mt-8'>Want to view all past podcasts on a single page?
                <Link to='./archives'>
                    <span className='text-primary-200 ml-1'>View our podcast archive</span>
                </Link>
            </p>
        </div>
    )
})

const TrendingPodcast = forwardRef((props, ref) => {
    const listEpisode = useSelector(state => state.listEpisode.itemsList)
    const statusListEpisode = useSelector(state => state.listEpisode.status)

    return (
        <div className='section'>
            <h1 className='title-section'>trending podcasts</h1>
            <div className="grid grid-cols-2 gap-x-16 gap-y-6 mt-10">
                {
                    statusListEpisode && listEpisode.length > 0 &&
                    listEpisode.map(item => 
                        <PodcastCard key={item._id} item={item} ref={ref} />
                    )
                }
            </div>
        </div>
    )
})