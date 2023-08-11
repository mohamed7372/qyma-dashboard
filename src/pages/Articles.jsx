import React, { forwardRef, useEffect, useRef, useState } from 'react'
import PodcastCard from '../components/ui/PodcastCard'
import SearchForm from '../components/form/SearchForm'
import Pagination from '../layouts/Pagination'
import NavBar from '../layouts/NavBar'
import Filter from '../layouts/Filter'
import Footer from '../layouts/Footer'
import { useDispatch, useSelector } from 'react-redux'
import articlesService from '../services/articles'
import { listArticleActions } from '../store/article/list-article-slice'
import { audioActions } from '../store/bussiness/audio-slice'
import Media from '../layouts/Media'
import { filterActions } from '../store/filter/filter-slice'
import ArticleCard from '../components/ui/ArticleCard'
import { grid } from '@chakra-ui/react'

const Articles = () => {
    const [gridDisplay, setGridDisplay] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const searchSlice = useSelector(state=>state.filter.search)
    const topicSlice = useSelector(state=>state.filter.topic)
    const durationSlice = useSelector(state=>state.filter.duration)
    const dateToSlice = useSelector(state=>state.filter.to)
    const dateFromSlice = useSelector(state=>state.filter.from)
    
    useEffect(() => {
        articlesService
            .getAll(100, searchSlice,dateFromSlice,dateToSlice,durationSlice,topicSlice)
            .then((res) => {
                dispatch(listArticleActions.replaceData(res.articles));    
                dispatch(listArticleActions.dataLoading());    
            }).catch((err) => {
                console.log(err);                
            });
    }, [dispatch, searchSlice, topicSlice, durationSlice, dateFromSlice,dateToSlice])

    return (
        <div className=' min-h-screen'>
            <nav className='pt-32'>
                <NavBar/>
            </nav>

            <main className='responsive'>
                <h1 className='font-extrabold capitalize text-xl md:text-3xl mb-8 text-center md:text-left'>Podcast Articles</h1>

                <SearchForm/>

                <Filter gridDisplay={gridDisplay} setGridDisplay={setGridDisplay} />

                <ListArticles gridDisplay={gridDisplay}/>
            </main>

            
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}

export default Articles

const ListArticles = ({gridDisplay}) => {
    const listArticle = useSelector(state => state.listArticle.itemsList)
    const statusListArticle = useSelector(state => state.listArticle.status)

    return (
        <div className='mt-10 mb-20'>
            <div className={`grid ${gridDisplay ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'} gap-x-10 gap-y-6 mb-10`}>
                {
                    statusListArticle &&
                    listArticle.map(item =>
                        <ArticleCard key={item._id} item={item} grid={gridDisplay} />
                    )
                }
            </div>

            {/* <Pagination/> */}
        </div>
    )
}