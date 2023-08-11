import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../layouts/NavBar'
import Footer from '../layouts/Footer'
import Subscribe from '../components/ui/Subscribe'
import Notes from '../components/ui/Notes'
import PodcastCard from '../components/ui/PodcastCard'
import { useDispatch, useSelector } from 'react-redux'
import MediaDetail from '../layouts/MediaDetail'
import StickyBox from 'react-sticky-box'
import PodcastPlatform from '../components/ui/PodcastPlatform'
import CommentBox from '../components/ui/CommentBox'
import IconLove from '../assets/icons/love.svg'
import IconLoveActif from '../assets/icons/love_actif.svg'
import IconDownload from '../assets/icons/download.svg'
import IconCheck from '../assets/icons/check.svg'
import IconShare from '../assets/icons/share.svg'
import PopUpShare from '../layouts/PopUpShare'
import episodeService from '../services/episode'
import { episodeActions } from '../store/bussiness/bussiness-slice'
import { Link, useParams } from 'react-router-dom'
import { audioActions } from '../store/bussiness/audio-slice'
import download from 'downloadjs';
import Media from '../layouts/Media'

const PodcastDetail = ({ admin = false }) => {
    const [showPopup, setShowPopup] = useState(false);

    const dispatch = useDispatch();

    const { id } = useParams();

    const audioRef = useRef()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        episodeService
            .get(id)
            .then((res) => {
                dispatch(episodeActions.replaceData(res.episode));
                dispatch(episodeActions.dataLoading());
            }).catch((err) => {
                console.log(err);
            });

    }, [dispatch])

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

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
            {
                !admin &&
                <nav>
                    <NavBar />
                </nav>
            }

            <main className={`${!admin ? 'responsive pt-40 pb-20' : 'pt-8'}`}>
                <Header />

                <div className='grid grid-cols-12'>
                    <div className={`${!admin ? 'col-span-9' : 'col-span-8'}`}>
                        <Titles />

                        <Detail />

                        <PodcastPlatform css='w-full xl:w-[90%] 2xl:w-2/3 mt-10' />

                        <Discuss />
                        <hr className='border-1' />
                        <Subscribe />
                        <hr className='border-1 mt-10 mb-10' />
                        <Explication />
                    </div>

                    <div className={`${!admin ? 'col-span-3' : 'col-span-4'} pl-8`}>
                        <StickyBox offsetTop={40} offsetBottom={20} className='mt-6'>
                            <MediaDetail admin={admin} ref={audioRef}/>
                            <Actions handle={togglePopup} admin={admin}/>
                        </StickyBox>
                    </div>
                </div>

                <h2 className='font-bold text-xl capitalize mt-10 mb-4'>Other content you may like:</h2>
                <Other/>

                {!admin &&
                    <div>
                        <h2 className='font-bold text-xl capitalize mt-10 mb-4'>commentaire (234):</h2>
                        <Comment />
                    </div>
                }
            </main>

            {!admin &&
                <footer>
                    <Footer />
                </footer>
            }

            {audio && <Media ref={audioRef} />}
            {
                <audio
                    ref={audioRef}
                    onTimeUpdate={getCurrDuration}
                    src={audio}
                ></audio>
            }

            <PopUpShare togglePopup={togglePopup} showPopup={showPopup} />
        </div>
    )
}

export default PodcastDetail

const Header = () => {
    const episode = useSelector(state => state.episode.item)
    const statusEpisode = useSelector(state => state.episode.status)

    if (!statusEpisode)
        return null;

    return (
        <div className=''>
            <div className='relative'>
                <img src={episode.image} alt="" className='w-full rounded-lg h-[300px] object-cover' />
                {/* <div className='absolute left-10 -bottom-4'>
                    <img src={ require('../assets/img/avatar-1.jpeg')} alt="" className='rounded-full w-[80px]'/>
                </div> */}
            </div>
        </div>
    );
}

const Titles = () => {
    const episode = useSelector(state => state.episode.item)
    const statusEpisode = useSelector(state => state.episode.status)

    if (!statusEpisode)
        return null;

    const date = new Date(episode.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '');

    return (
        <div>
            <h1 className='text-3xl font-bold mt-10'>#{episode.episodeNumber} - {episode.title}.</h1>
            <Link to={`../topics/${episode.category._id}`} className='!w-fit'>
                <p className='text-xl capitalize font-semibold hover:text-primary-200 w-fit'>{episode.category.title}</p>
            </Link>
            <p className='text-sm'>{formattedDate}</p>
        </div>
    )
}

const Detail = () => {
    const episode = useSelector(state => state.episode.item)
    const statusEpisode = useSelector(state => state.episode.status)

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-xl mb-2'>Description:</h2>
            {
                statusEpisode && 
                <div dangerouslySetInnerHTML={{ __html: episode.description }} />
            }
        </div>
    )
}

const Discuss = () => {
    const episode = useSelector(state => state.episode.item)
    const statusEpisode = useSelector(state => state.episode.status)

    return (
        <div className='mt-10 mb-5'>
            <h2 className='font-bold text-xl'>We Discuss:</h2>
            <ul>
                {
                    statusEpisode && episode.notes.map(item =>
                        <li className='flex items-start py-2' key={item._id}>
                            <div className='mt-2 w-[10px] h-[10px] rounded-full border-2 mr-4 border-primary-200'></div>
                            <p className='mr-2'>{item.note}</p>
                            <p className='text-white font-medium'>[{item.time}]</p>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

const Explication = () => {
    const episode = useSelector(state => state.episode.item)
    const statusEpisode = useSelector(state => state.episode.status)

    return (
        <div>
            <h2 className='font-bold text-xl'>Explication:</h2>
            {
                statusEpisode && 
                <div dangerouslySetInnerHTML={{ __html: episode.explication }} />
            }
        </div>
    )
}

const Other = () => {
    const [similair, setSimilair] = useState([])

    const { id } = useParams();

    useEffect(() => {
        episodeService
            .getSimilar(id)
            .then(res =>
                setSimilair(res.similarEpisodes)
            )
    }, [])

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-10`}>
            {
                similair && similair.length > 0 &&
                similair.map(item =>
                    <div className='' key={item._id}>
                        <PodcastCard key={item._id} item={item} show />
                    </div>
                )
            }
        </div>
    )
}

const Comment = () => {
    return (
        <div>
            <CommentBox />
            <CommentBox />
            <CommentBox />
            <CommentBox />
            <CommentBox />
            <p className='text-center font-bold capitalize cursor-pointer'>show more</p>
        </div>
    )
}

const Actions = ({ handle, admin = false }) => {
    const [love, setLove] = useState(false);
    const [isDownlaod, setDownload] = useState(false);

    const episode = useSelector(state => state.episode.item)
    const statusEpisode = useSelector(state => state.episode.status)

    const downloadAudio = (title='audio', url) => {
        fetch(url)
        .then(response => response.blob())
            .then(blob => {
            const nameFile = statusEpisode ? `#${episode.episodeNumber} ${episode.title}` : 'audio'
            download(blob,  nameFile + '.mp3', 'audio/mp3');
            setDownload(true);
        });
    }

    return (
        <div className={`${!admin ? 'bg-gray-800' : 'bg-gray-700'} rounded-lg mt-4 px-4 py-4 grid grid-cols-3 gap-x-4`}>
            <button className='border p-4 rounded-lg flex items-center justify-center' onClick={() => setLove(!love)}>
                <img src={love ? IconLoveActif : IconLove} alt="" className='w-[20px]' />
            </button>
            <button className={`border p-4 rounded-lg flex items-center justify-center ${isDownlaod && 'cursor-default'}`} onClick={() => downloadAudio('https://res.cloudinary.com/dhf83aynm/video/upload/v1690048671/xocosimtfastuuejnbgr.mp3')}>
                {!isDownlaod
                    ? <img src={IconDownload} alt="" className='w-[20px]' />
                    : <img src={IconCheck} alt="" className='w-[20px]' />
                }
            </button>
            <button className='border p-4 rounded-lg flex items-center justify-center' onClick={handle}>
                <img src={IconShare} alt="" className='w-[20px]' />
            </button>
        </div>
    )
}