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
import categoriesService from '../../services/category'
import ReviewsTable from '../components/ui/ReviewsTable'
import reviewService from '../../services/review'
import { listReviewActions } from '../../store/reviews/list-review-slice'
import { useToast } from '@chakra-ui/react'
import SelectCustom from '../../components/form/SelectCustom'
import InputCustom from '../../components/form/InputCustom'

const Reviews = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const searchSlice = useSelector(state=>state.filter.search)
    const topicSlice = useSelector(state=>state.filter.topic)
    const statusSlice = useSelector(state=>state.filter.status)
    const dateToSlice = useSelector(state=>state.filter.to)
    const dateFromSlice = useSelector(state=>state.filter.from)
    
    const dataStatus = [
        {
            _id: 0,
            title: 'not published'
        },
        {
            _id: 1,
            title: 'published'
        }
    ]

    // get all reviews 
    useEffect(() => {
        reviewService
            .getReviews()
            .then((res) => {
                dispatch(listReviewActions.replaceData(res.data.data));    
                dispatch(listReviewActions.dataLoading());    
                console.log(res.data.data);
            }).catch((err) => {
                console.log(err);                
            });
    }, [dispatch, searchSlice, topicSlice, dateFromSlice,dateToSlice, statusSlice])

    const toast = useToast()

    const [msgToast, setMsgToast] = useState('')
    const [typeToast, setTypeToast] = useState('')
    const [titleToast, setTitleToast] = useState('')
    
    // // show toast msg 
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

    const handleDelete = (idComment, userName, bussinessName) => {
        reviewService
            .deleteReview(idComment)
            .then(res => {
                setTypeToast('success') 
                setTitleToast('Review deleted.')
                setMsgToast(`We\'ve delete a review for user ${userName} of ${bussinessName} for you.`);

                dispatch(listReviewActions.removeData(idComment));    
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
                        <h1 className='text-xl font-bold capitalize mr-4'>All reviews</h1>
                        <div className='w-1/2 flex items-center'>
                            <SearchBar />
                            <button className='w-10 h-10 bg-primary-200 rounded-lg flex justify-center items-center ml-2'>
                                <img src={RefreshIcon} alt="" className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-x-6 mt-8 mb-8">
                        <InputCustom title={'from'}/>
                        <InputCustom title={'to'}/>
                        <SelectCustom title={'status'} data={dataStatus}/>
                        <SelectCustom title={'rating'} data={dataStatus}/>
                    </div>

                    <ReviewsTable handleDelete={handleDelete} />
                    
                    {/* <div className='mt-4'></div> */}
                    {/* <Pagination/> */}
                </Card>

                <div className='pt-5'></div>
            </main>
        </div>
    )
}

export default Reviews