import React from 'react'
import Card from '../components/ui/Card'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import categoriesService from '../services/categories';
import { useDispatch, useSelector } from 'react-redux';
import { categoryActions } from '../store/category/category-slice';
import { forwardRef } from 'react';
import PodcastCard from '../components/ui/PodcastCard';
import ArticleCard from '../components/ui/ArticleCard';
import episode from '../services/episode';
import { listEpisodeActions } from '../store/bussiness/list-bussiness-slice';
import { listArticleActions } from '../store/article/list-article-slice';
import Footer from '../layouts/Footer';
import NavBar from '../layouts/NavBar';
import CommentBox from '../components/ui/CommentBox';
import { listCategoryActions } from '../store/category/list-category-slice';

const TopicDetail = ({ admin = false }) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        categoriesService
            .get(id)
            .then(res => {
                dispatch(categoryActions.replaceData(res.category))
                dispatch(categoryActions.dataLoading())

                dispatch(listEpisodeActions.replaceData(res.episodes))
                dispatch(listEpisodeActions.dataLoading())

                dispatch(listArticleActions.replaceData(res.articles))
                dispatch(listArticleActions.dataLoading())
            })
    }, [])



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
                <ListPodcast />
                <ListArticle />
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
        </div>
    )
}

export default TopicDetail

const Header = () => {
    const topic = useSelector(state => state.category.item)
    const statusTopic = useSelector(state => state.category.status)

    if (!statusTopic)
        return <>loading...</>

    return (
        <div>
            <Card css={'h-[300px]'} bgImg={topic.image}>
            </Card>
            <h4 className='text-center mt-8 text-sm font-medium uppercase'>topic</h4>
            <h1 className='text-center mt-4 font-bold text-3xl capitalize'>{topic.title}</h1>
            <p className='font-light mt-10 text-center'>{topic.description}</p>
        </div>
    )
}

const ListPodcast = forwardRef((props, ref) => {
    const topic = useSelector(state => state.category.item)
    const statusTopic = useSelector(state => state.category.status)

    const listEpisode = useSelector(state => state.listEpisode.itemsList)
    const statusListEpisode = useSelector(state => state.listEpisode.status)

    return (
        <div className='mt-10 !mb-10'>
            <h1 className='text-2xl font-semibold capitalize'>podcasts</h1>
            <div className="grid grid-cols-2 gap-x-16 gap-y-6 mt-6">
                {
                    statusListEpisode && listEpisode.list.map(item =>
                        <PodcastCard key={item._id} item={{ ...item, 'category': topic.title }} ref={ref} />
                    )
                }
            </div>
        </div>
    )
})

const ListArticle = forwardRef((props, ref) => {
    const topic = useSelector(state => state.category.item)
    const statusTopic = useSelector(state => state.category.status)

    const listArticle = useSelector(state => state.listArticle.itemsList)
    const statusListArticle = useSelector(state => state.listArticle.status)

    return (
        <div className='mt-10 !mb-10'>
            <h1 className='text-2xl font-semibold capitalize'>articles</h1>
            <div className="grid grid-cols-1 mt-6">
                {
                    statusListArticle && listArticle.list.map(item =>
                        <ArticleCard key={item._id} item={{ ...item, 'category': topic.title }} ref={ref} />
                    )
                }
            </div>
        </div>
    )
})


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
