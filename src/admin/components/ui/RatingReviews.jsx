import React, { useEffect, useState } from 'react'
import Rating from './Rating'
// import ReviewCard2 from './ReviewCard2'
import ReviewCard2List from './ReviewCard2List'
// import ReviewCardList from './ReviewCardList'
import { useDispatch, useSelector } from 'react-redux'
import { json, useLocation, useParams } from 'react-router-dom'
// import AddComment from '../form/AddComment'
import { Progress } from '@chakra-ui/react'
import reviewService from '../../../services/review'
import { listReviewActions } from '../../../store/reviews/list-review-slice'
import Card from './Card'

export const RatingReviews = () => {
    const bussinessData = useSelector(state => state.bussiness.item);
    const bussinessDataLoading = useSelector(state => state.bussiness.status);

    const reviewData = useSelector(state => state.listReview.itemsList);
    const reviewDataLoading = useSelector(state => state.listReview.status);

    if (!bussinessDataLoading || !reviewDataLoading)
        return (<>loading...</>)
    
    return (
        <div className='px-4 md:px-0'>
            <Card>
                <h3 className='text-center md:text-left font-bold text-2xl '>Ratings & Reviews</h3>
                <p className='text-center md:text-left text-sm mt-2'>Review about <span className='font-semibold'>{ bussinessData.name}</span></p>
                <div className='mt-3 grid grid-cols-6 mb-8'>
                    <div className='col-span-2 flex flex-col items-center md:block'>
                        <p className='text-primary-200 text-7xl font-bold mb-4'>{ bussinessData.rate}</p>
                        <Rating nbr_star={bussinessData.rate} square />
                        <p className='font-semibold text-xs text-gray-500 mt-3'>{ bussinessData.nbrRates} rattings</p>
                    </div>
                    <div className='col-span-4 mt-8 md:mt-0'>
                        {
                            bussinessData.analytics !== undefined &&
                            bussinessData.analytics.length > 0 ?
                            <ul>
                                <li className='mb-2'><StarStat star={5} nbr={bussinessData.analytics[5].nbr} total={bussinessData.nbrRates}/></li>
                                <li className='mb-2'><StarStat star={4} nbr={bussinessData.analytics[4].nbr} total={bussinessData.nbrRates}/></li>
                                <li className='mb-2'><StarStat star={3} nbr={bussinessData.analytics[3].nbr} total={bussinessData.nbrRates}/></li>
                                <li className='mb-2'><StarStat star={2} nbr={bussinessData.analytics[2].nbr} total={bussinessData.nbrRates}/></li>
                                <li className='mb-2'><StarStat star={1} nbr={bussinessData.analytics[1].nbr} total={bussinessData.nbrRates}/></li>
                            </ul>
                            : <ul>
                                <li className='mb-2'><StarStat star={5} nbr={0} total={0}/></li>
                                <li className='mb-2'><StarStat star={4} nbr={0} total={0}/></li>
                                <li className='mb-2'><StarStat star={3} nbr={0} total={0}/></li>
                                <li className='mb-2'><StarStat star={2} nbr={0} total={0}/></li>
                                <li className='mb-2'><StarStat star={1} nbr={0} total={0}/></li>
                            </ul>
                        }
                    </div>
                </div>
            </Card>
            {/* <AddComment/> */}

            <Card>
                <h3 className='text-center md:text-left font-bold text-2xl my-4' id='reviews'>Customer Reviews ({reviewData.length})</h3>
                <ReviewCard2List/>
            </Card>
        </div>
    )
}

const StarStat = ({star, nbr, total}) => {
    return (
        <div className='flex w-full items-center'>
            <div className='w-2/6 md:w-1/6 flex flex-col items-center text-sm'>
                <p className='font-semibold'>{star} star</p>
                <p> ({nbr} rates)</p>
            </div>
            <ProgressBar val={(nbr * 100) / total}/>
            {/* <Progress value={80} /> */}
            {/* <div className='bg-gray-200 rounded-full h-3 w-5/6 relative overflow-hidden'> */}
                <Progress value={80} />
                {/* <div className='bg-primary-200 rounded-full h-3 w-full absolute -left-40'></div> */}
            {/* </div> */}
        </div>
    );
}


const ProgressBar = ({val}) => {
    // const [progress, setProgress] = useState(0);

    return (
        <div className='w-full'>
            <progress value={val} max="100" className='rounded-full h-3 w-full'/>
        </div>
    );
}