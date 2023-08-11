import { Link, useLocation } from "react-router-dom";
// import Pagination from "../../layouts/Pagination";
import Button from "./Button";
import ReviewCard2 from "./ReviewCard2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const ReviewCard2List = ({ reviewsData, reviewsStat }) => {
    const [nbrShow, setNbrShow] = useState(2)
    const [filterStar, setFilterStar] = useState(0)

    const reviewData = useSelector(state => state.listReview.itemsList);
    const reviewDataLoading = useSelector(state => state.listReview.status);

    if (!reviewDataLoading)
        return null;
    
    return (
        <div>
            <ul className="md:flex mb-4 grid grid-cols-2 gap-y-2">
                <li onClick={() => setFilterStar(0)}
                    className={`badge ${filterStar === 0 && 'bg-primary-200 bg-opacity-20'}`}>
                    <span>All ({reviewData.length})</span>
                </li>
                {
                    [5,4,3,2,1].map(n =>
                    {
                        const nbr = reviewData.reduce((acc, review) => acc + (Math.floor(review.reviewNote) === n ? 1 : 0), 0)
                        return (
                            <li key={n} onClick={() => setFilterStar(n)}
                                className={`badge ${filterStar === n && 'bg-primary-200 bg-opacity-20'}`}>
                                <span>{n} stars ({ nbr})</span>
                            </li>
                        )
                    }
                    )
                }
            </ul>
            {
                reviewData
                    .filter(item => {
                        if (filterStar === 0)
                            return true
                        return Math.floor(item.reviewNote) === filterStar
                        })
                    .slice(0, nbrShow)
                    .map(item =>
                        <div key={item.id}>
                            <ReviewCard2 review={item} />
                        </div>
                    )
            }
            {
                reviewData.filter(item => {
                        if (filterStar === 0)
                            return true
                        return Math.floor(item.reviewNote) === filterStar
                        })
                    .length > nbrShow &&
                <div className="w-full flex justify-center mt-8">
                    <Button title={'View More'} px={'px-10'} handleButton={() => {setNbrShow(nbrShow + 2)}} />
                </div>
            }
        </div>
    );
}

export default ReviewCard2List;