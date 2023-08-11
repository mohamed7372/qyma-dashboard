import React, { forwardRef, useEffect, useRef, useState } from 'react'
import PodcastCard from '../components/ui/PodcastCard'
import SearchForm from '../components/form/SearchForm'
import Pagination from '../layouts/Pagination'
import NavBar from '../layouts/NavBar'
import Filter from '../layouts/Filter'
import Footer from '../layouts/Footer'
import { useDispatch, useSelector } from 'react-redux'
import episodeService from '../services/episode'
import { listEpisodeActions } from '../store/bussiness/list-bussiness-slice'
import { audioActions } from '../store/bussiness/audio-slice'
import Media from '../layouts/Media'
import { filterActions } from '../store/filter/filter-slice'

const Archive = () => {
    const [gridDisplay, setGridDisplay] = useState(true);

    const dispatch = useDispatch();

    const audioRef = useRef()
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const searchSlice = useSelector(state=>state.filter.search)
    const topicSlice = useSelector(state=>state.filter.topic)
    const durationSlice = useSelector(state=>state.filter.duration)
    const dateToSlice = useSelector(state=>state.filter.to)
    const dateFromSlice = useSelector(state=>state.filter.from)
    
    useEffect(() => {
        episodeService
            .getAll(100, searchSlice,dateFromSlice,dateToSlice,durationSlice,topicSlice)
            .then((res) => {
                dispatch(listEpisodeActions.replaceData(res.episodes));    
                dispatch(listEpisodeActions.dataLoading());    
            }).catch((err) => {
                console.log(err);                
            });
    }, [dispatch, searchSlice, topicSlice, durationSlice, dateFromSlice,dateToSlice])

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
            <nav className='pt-32'>
                <NavBar/>
            </nav>

            <main className='responsive'>
                <h1 className='font-extrabold capitalize text-xl md:text-3xl mb-8 text-center md:text-left'>Podcast Archive</h1>

                <SearchForm/>

                <Filter gridDisplay={gridDisplay} setGridDisplay={setGridDisplay} />

                <ListPodcast gridDisplay={gridDisplay} ref={audioRef} />
            </main>

            
            <footer>
                <Footer/>
            </footer>

            {audio && <Media ref={audioRef} />}
            {
                <audio
                    ref={audioRef}
                    onTimeUpdate={getCurrDuration}
                    src={audio}
                ></audio>
            }
        </div>
    )
}

export default Archive

const ListPodcast = forwardRef((props, ref) => {
    const listEpisode = useSelector(state => state.listEpisode.itemsList)
    const statusListEpisode = useSelector(state => state.listEpisode.status)

    return (
        <div className='mt-10 mb-20'>
            <div className={`grid ${props.gridDisplay ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-x-10 gap-y-6 mb-10`}>
                {
                    statusListEpisode &&
                    listEpisode.map(item => 
                        <PodcastCard key={item._id} item={item} ref={ref}/>
                    )
                }
            </div>

            {/* <Pagination/> */}
        </div>
    )
})