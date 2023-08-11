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
import articlesService from '../services/articles'
import { articleActions } from '../store/article/article-slice'
import { Link, useParams } from 'react-router-dom'
import { audioActions } from '../store/bussiness/audio-slice'
import download from 'downloadjs';
import Media from '../layouts/Media'

const ArticleDetail = ({ admin = false }) => {
    const [showPopup, setShowPopup] = useState(false);

    const dispatch = useDispatch();

    const { id } = useParams();

    const audioRef = useRef()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        articlesService
            .get(id)
            .then((res) => {
                dispatch(articleActions.replaceData(res.article));
                dispatch(articleActions.dataLoading());
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

                <div className=''>
                    <Titles />

                    <CardDetail handle={togglePopup}/>

                    <Detail />

                    <PodcastPlatform css={ `w-2/3 m-auto mt-10`} />

                    <hr className='border-1 mt-20' />
                    
                    <Subscribe />

                    <hr className='border-1 mt-10 mb-20' />
                </div>

                <h2 className='font-bold text-xl capitalize mt-10 mb-4'>Other content you may like:</h2>
                <Other/>

                <div>
                    <h2 className='font-bold text-xl capitalize mt-10 mb-4'>commentaire (234):</h2>
                    <Comment />
                </div>
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

export default ArticleDetail

const Header = () => {
    const article = useSelector(state => state.article.item)
    const statusArticle = useSelector(state => state.article.status)

    if (!statusArticle)
        return null;

    return (
        <div className=''>
            <div className='relative'>
                <img src={article.image} alt="" className='w-full rounded-lg h-[300px] object-cover' />
                {/* <div className='absolute left-10 -bottom-4'>
                    <img src={ require('../assets/img/avatar-1.jpeg')} alt="" className='rounded-full w-[80px]'/>
                </div> */}
            </div>
        </div>
    );
}

const Titles = () => {
    const article = useSelector(state => state.article.item)
    const statusArticle = useSelector(state => state.article.status)

    if (!statusArticle)
        return null;

    return (
        <div>
            <h1 className='text-center w-2/4 m-auto text-3xl font-bold mt-10'>#{article.articleNumber} - {article.title}.</h1>
            <p className='text-center mt-4 w-3/4 mx-auto'>{article.description}</p>
        </div>
    )
}

const Detail = () => {
    const article = useSelector(state => state.article.item)
    const statusArticle = useSelector(state => state.article.status)

    if (!statusArticle)
        return null

    return (
        <div className='mt-10'>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
        
    )
}

const CardDetail = ({handle}) => {
    const [love, setLove] = useState(false);

    const pathUrl = window.location.pathname

    const article = useSelector(state => state.article.item)
    const statusArticle = useSelector(state => state.article.status)

    if (!statusArticle)
        return null

    const date = new Date(article.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    return (
        <div className={`mt-10 grid grid-cols-12 ${pathUrl.includes('admin') ? 'bg-gray-700' : 'bg-gray-800'} px-8 py-4 rounded-lg gap-x-6`}>
            <div className='flex col-span-3 h-full items-center'>
                <div className='w-[35px] h-[35px] bg-white rounded-full p-1'>
                    <img src={require('../assets/img/avatar-1.jpeg')} alt="" className='w-full object-cover rounded-full' />
                </div>
                <div className='ml-3'>
                    <p className='text-sm font-medium capitalize'>Lorem, ipsum dolor.</p>
                    <p className='text-xs font-light'>{formattedDate}</p>
                </div>
            </div>
            <div className='col-span-3 flex flex-col items-end justify-center'>
                <h4 className='w-[100px] text-sm font-medium capitalize'>Topic</h4>
                <Link to={`../topics/${article.category._id}`}>
                    <p className='text-xs w-[100px] font-light hover:text-primary-200'>{article.category.title}</p>
                </Link>
            </div>
            <div className='col-span-3 flex flex-col items-end justify-center'>
                <h4 className='w-[100px] text-sm font-medium capitalize'>read time</h4>
                <p className='text-xs w-[100px] font-light'>{article.readTime}</p>
            </div>
            <div className='flex justify-end col-span-3'>
                <button className='border p-4 rounded-lg flex items-center justify-center mr-4' onClick={() => setLove(!love)}>
                    <img src={love ? IconLoveActif : IconLove} alt="" className='w-[20px]' />
                </button>
                <button className='border p-4 rounded-lg flex items-center justify-center' onClick={handle}>
                    <img src={IconShare} alt="" className='w-[20px]' />
                </button>
            </div>
        </div>
    )
}


const Other = () => {
    const listArticle = useSelector(state => state.listArticle.itemsList)
    const statusListArticle = useSelector(state => state.listArticle.status)

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-10`}>
            {
                statusListArticle &&
                listArticle.slice(0, 4).map(item =>
                    <div className='border rounded-lg' key={item._id}>
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

    const article = useSelector(state => state.article.item)
    const statusArticle = useSelector(state => state.article.status)

    const downloadAudio = (title='audio', url) => {
        fetch(url)
        .then(response => response.blob())
            .then(blob => {
            const nameFile = statusArticle ? `#${article.articleNumber} ${article.title}` : 'audio'
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