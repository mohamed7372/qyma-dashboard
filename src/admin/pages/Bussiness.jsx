import React, { useEffect, useState } from 'react'
import Card from '../components/ui/Card'
import Filter from '../layout/Filter'
import SearchBar from '../components/form/SearchBar'
import AddIcon from '../../assets/icons/add.svg'
import RefreshIcon from '../../assets/icons/refresh.svg'
import SideBar from '../layout/SideBar'
import { Link } from 'react-router-dom'
import StickyBox from 'react-sticky-box'
import { useDispatch, useSelector } from 'react-redux'
import {listBussinessActions} from '../../store/bussiness/list-bussiness-slice'
import BussinessTable from '../components/ui/BussinessTable'
import BussinessRequestCard from '../components/ui/BussinessRequestCard'
import bussinessService from '../../services/bussiness'

const Bussiness = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [alert, setAlert] = useState(0)   // 1 for success
    const [msgAlert, setMsgAlert] = useState('')
    const [trending, setTrending] = useState([])
    
    const searchSlice = useSelector(state=>state.filter.search)
    const topicSlice = useSelector(state=>state.filter.topic)
    const statusSlice = useSelector(state=>state.filter.status)
    const dateToSlice = useSelector(state=>state.filter.to)
    const dateFromSlice = useSelector(state=>state.filter.from)
    
    // get all episode 
    useEffect(() => {
        bussinessService
            .getBussiness()
            .then((res) => {
                dispatch(listBussinessActions.replaceData(res.data.data));    
                dispatch(listBussinessActions.dataLoading());    
            }).catch((err) => {
                console.log(err);                
            });
    }, [dispatch, searchSlice, topicSlice, dateFromSlice,dateToSlice, statusSlice])

    return (
        <div className='grid grid-cols-12 min-h-screen'>

            <aside className='col-span-2 bg-secondary-200 pt-10'>
                <StickyBox offsetTop={40} offsetBottom={20}>
                    <SideBar/>
                </StickyBox>
            </aside>
            <main className='col-span-10 px-8'>
                <div className='pt-20'></div>

                <Card>
                    <div className='flex items-center justify-between mb-4'>
                        <h1 className='text-xl font-bold capitalize'>Bussiness Requests</h1>
                        <p className='font-medium cursor-pointer capitalize text-primary-300'>see all</p>
                    </div>
                    <div className='grid grid-cols-4 gap-x-4'>
                        {
                            [1,2,3,4].map((item, idx) =>
                                <BussinessRequestCard key={idx} item={item}/>
                            )
                        }
                    </div>
                </Card>

                <div className='pt-5'></div>

                <Card>
                    <div className='flex items-center mt-2'>
                        <h1 className='text-xl font-bold capitalize mr-4'>All Bussiness</h1>
                        <div className='w-1/2 flex items-center'>
                            <SearchBar />
                            <Link to={'add'}>
                                <button className='w-10 h-10 bg-primary-200 rounded-lg flex justify-center items-center ml-2'>
                                    <img src={AddIcon} alt="" className='w-4 h-4'/>
                                </button>
                            </Link>
                            <button className='w-10 h-10 bg-primary-200 rounded-lg flex justify-center items-center ml-2'>
                                <img src={RefreshIcon} alt="" className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                    <Filter/>
                    <BussinessTable setAlert={setAlert} setMsgAlert={setMsgAlert} />
                    
                    {/* <div className='mt-4'></div> */}
                    {/* <Pagination/> */}
                </Card>

                <div className='pt-5'></div>
            </main>
        </div>
    )
}

export default Bussiness