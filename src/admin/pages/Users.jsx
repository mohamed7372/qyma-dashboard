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
import {listUserActions, lsitUserActions} from '../../store/user/list-user-slice'
import CategoriesTable from '../components/ui/CategoriesTable'
import categoriesService from '../../services/category'
import UsersTable from '../components/ui/UsersTable'
import userService from '../../services/user'
import { useToast } from '@chakra-ui/react'

const Users = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const searchSlice = useSelector(state=>state.filter.search)
    const typeAccountSlice = useSelector(state=>state.filter.typeAccount)
    const statusSlice = useSelector(state=>state.filter.status)
    const dateToSlice = useSelector(state=>state.filter.to)
    const dateFromSlice = useSelector(state=>state.filter.from)
    
    // get all users 
    useEffect(() => {
        userService
            .getUsers(searchSlice, typeAccountSlice, dateFromSlice, dateToSlice, statusSlice)
            .then((res) => {
                dispatch(listUserActions.replaceData(res.data.data));    
                dispatch(listUserActions.dataLoading());    
            }).catch((err) => {
                console.log(err);                
            });
    }, [dispatch, searchSlice, typeAccountSlice, dateFromSlice,dateToSlice, statusSlice])

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
    
    const handleDelete = (id, name) => {
        userService
            .deleteEpisode(id)
            .then(res => {
                setTypeToast('success') 
                setTitleToast('User deleted.')
                setMsgToast(`We\'ve delete user ${name} for you.`);

                dispatch(listUserActions.removeData(id));    
            })
            .catch(err => {
                console.log(err);
            })
    }

    const toggleStatus = (id, name, value) => {
        userService
            .toggleUser(id)
            .then(res => {
                setTypeToast('success') 
                setTitleToast('User updated.')
                setMsgToast(`We\'ve change user ${name} status for you.`);

                dispatch(listUserActions.updateData({ id:id, value:value}));    
            })
            .catch(err => {
                console.log(err);
            })
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
                        <h1 className='text-xl font-bold capitalize mr-4'>All Users</h1>
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
                    <Filter showTypeAccount/>
                    <UsersTable handleDelete={handleDelete} toggleStatus={toggleStatus} />
                </Card>

                <div className='pt-5'></div>
            </main>
        </div>
    )
}

export default Users