import React, { useEffect, useState } from 'react'
import PodcastCard from '../components/ui/PodcastCard'
import PodcastItem from '../components/ui/PodcastItem'
import PodcastTable from '../components/ui/BussinessTable'
import Pagination from '../../layouts/Pagination'
import Card from '../components/ui/Card'
import Filter from '../layout/Filter'
import SearchBar from '../components/form/SearchBar'
import AddIcon from '../../assets/icons/add.svg'
import RefreshIcon from '../../assets/icons/refresh.svg'
import SideBar from '../layout/SideBar'
import { Link } from 'react-router-dom'
import StickyBox from 'react-sticky-box'
import episodeService from '../../services/episode'
import { useDispatch, useSelector } from 'react-redux'
import {listEpisodeActions} from '../../store/bussiness/list-bussiness-slice'
import AlertCustom from '../components/ui/AlertCustom'
import ArticleTable from '../components/ui/ArticleTable'
import TopicCard from '../../components/ui/TopicCard'
import TopicTable from '../components/ui/TopicTable'
import categoriesService from '../../services/categories'
import { listCategoryActions } from '../../store/category/list-category-slice'

const TopicAdmin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [alert, setAlert] = useState(0)   // 1 for success
    const [msgAlert, setMsgAlert] = useState('')
    
    const searchSlice = useSelector(state=>state.filter.search)
    const topicSlice = useSelector(state=>state.filter.topic)
    const statusSlice = useSelector(state=>state.filter.status)
    const dateToSlice = useSelector(state=>state.filter.to)
    const dateFromSlice = useSelector(state=>state.filter.from)
    
    // get all episode 
    useEffect(() => {
        categoriesService
            .getAll()
            .then((res) => {
                dispatch(listCategoryActions.replaceData(res.categories));    
                dispatch(listCategoryActions.dataLoading());    
            }).catch((err) => {
                console.log(err);                
            });
    }, [dispatch, searchSlice, topicSlice, dateFromSlice,dateToSlice, statusSlice])

    return (
        <div className='grid grid-cols-12  min-h-screen'>
            {/* <AlertCustom alert={alert} setAlert={setAlert} msgAlert={msgAlert} setMsgAlert={setMsgAlert}/> */}

            <aside className='col-span-2 bg-gray-800 pt-10'>
                <StickyBox offsetTop={40} offsetBottom={20}>
                    <SideBar/>
                </StickyBox>
            </aside>
            <main className='col-span-10 px-8'>
                <div className='pt-20'></div>

                <Card>
                    <h1 className='text-xl font-bold capitalize mb-4'>trending podcast</h1>
                    <div className='grid grid-cols-5 gap-x-4'>
                        {/* <TopicCard/>
                        <TopicCard/>
                        <TopicCard/>
                        <TopicCard/> */}
                    </div>
                </Card>

                <div className='pt-5'></div>

                <Card>
                    <div className='flex items-center mt-2 mb-4'>
                        <h1 className='text-xl font-bold capitalize mr-4'>All Topics</h1>
                        <div className='w-1/2 flex items-center'>
                            <SearchBar />
                            <Link to={'add'}>
                                <button className='w-10 h-10 bg-primary-200 bg-opacity-30 rounded-lg flex justify-center items-center ml-2'>
                                    <img src={AddIcon} alt="" className='w-4 h-4'/>
                                </button>
                            </Link>
                            <button className='w-10 h-10 bg-primary-200 bg-opacity-30 rounded-lg flex justify-center items-center ml-2'>
                                <img src={RefreshIcon} alt="" className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                    <TopicTable setAlert={setAlert} setMsgAlert={setMsgAlert}/>
                    {/* <div className='mt-4'></div> */}
                    {/* <Pagination/> */}
                </Card>

                <div className='pt-5'></div>
            </main>
        </div>
    )
}

export default TopicAdmin