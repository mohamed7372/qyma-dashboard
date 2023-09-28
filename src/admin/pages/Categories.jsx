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
import {listCategoryActions} from '../../store/category/list-category-slice'
import CategoriesTable from '../components/ui/CategoriesTable'
import { useToast } from '@chakra-ui/react'
import categoriesService from '../../services/categories'

const Categories = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const searchSlice = useSelector(state=>state.filter.search)
    const statusSlice = useSelector(state=>state.filter.status)
    const dateToSlice = useSelector(state=>state.filter.to)
    const dateFromSlice = useSelector(state=>state.filter.from)
    
    const toast = useToast()

    const [msgToast, setMsgToast] = useState('')
    const [typeToast, setTypeToast] = useState('')
    const [titleToast, setTitleToast] = useState('')

    // show toast msg 
    useEffect(() => {
        if (msgToast && titleToast && typeToast) {
            toast({
                title: titleToast,
                description: msgToast,
                status: typeToast,
                duration: 5000,
                isClosable: true,
            })
        }

    }, [msgToast, titleToast, typeToast])

    
    // get all categories 
    useEffect(() => {
        categoriesService
            .getAll(searchSlice,dateFromSlice, dateToSlice, statusSlice)
            .then((res) => {
                dispatch(listCategoryActions.replaceData(res.data));    
                dispatch(listCategoryActions.dataLoading());    
            }).catch((err) => {
                console.log(err);                
            });
    }, [dispatch, searchSlice, dateFromSlice,dateToSlice, statusSlice])

    const handleDelete = (id, name) => {
        categoriesService
            .deleteCategory(id)
            .then(res => {
                setTypeToast('success') 
                setTitleToast('User deleted.')
                setMsgToast(`We\'ve delete user ${name} for you.`);

                dispatch(listCategoryActions.removeData(id));    
            })
            .catch(err => {
                console.log(err);
            })
    }

    const toggleStatus = (id, name, value) => {
        console.log(id, name, value);
        dispatch(listCategoryActions.updateData({ id:id, value:value}));    
        // categoriesService
        //     .toggleCategory(id)
        //     .then(res => {
        //         setTypeToast('success') 
        //         setTitleToast('User updated.')
        //         setMsgToast(`We\'ve change user ${name} status for you.`);
                
        //         dispatch(listCategoryActions.updateData({ id:id, value:true}));    
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }

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
                    <div className='flex items-center mt-2'>
                        <h1 className='text-xl font-bold capitalize mr-4'>All Categories</h1>
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
                    <CategoriesTable handleDelete={handleDelete} toggleStatus={toggleStatus} />
                    
                    {/* <div className='mt-4'></div> */}
                    {/* <Pagination/> */}
                </Card>

                <div className='pt-5'></div>
            </main>
        </div>
    )
}

export default Categories