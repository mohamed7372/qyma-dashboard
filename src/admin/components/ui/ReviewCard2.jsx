import Rating from "./Rating";
import Button from './Button'
import ImgNF from '../../../assets/img/image_not_found.jpeg'
import { useState } from "react";
import ImageName from "./ImageName";

const ReviewCard2 = ({review}) => {
    const [showMore, setShowMore] = useState(false)

    const [like, setLike] = useState(false)
    const [nbrLike, setNbrLike] = useState(23)
    const [dislike, setDislike] = useState(false)
    const [nbrLDslike, setNbrDislike] = useState(13)

    const convertToDateFromat = (val) => {
        if (!val) 
            return '-'

        const date = new Date(val);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '');
    
        return formattedDate;
    }

    return (
        <div className="flex shadow-sm hover:shadow-lg p-4 rounded-lg mb-3 bg-primary-200 bg-opacity-20">
            <div className="w-24 pr-8 hidden md:block">
                <ImageName img={review.user && `${process.env.REACT_APP_BASE_URL + "\\" + review.user.image.filePath}`} />
            </div>
            <div className="details w-full">
                <div className="head flex md:items-center justify-between mb-2 flex-col md:flex-row">
                    <div className="flex md:items-center flex-col md:flex-row">
                        <h5 className="font-bold mr-3">{review.user && review.user.displayName}</h5>
                        <p className="font-light text-xs">@{review.user && review.user.username }</p>
                    </div>
                    <p className="font-light text-xs">{convertToDateFromat(review.createdAt)}</p>
                </div>
                <Rating nbr_star={Math.floor(review.reviewNote)} square />
                <div className="flex items-center mt-3">
                    <ul>
                        <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>
                            <p className="text-sm ml-3">2 photos</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="my-4 text-sm ">
                        {review.description}
                    </p>
                    <div className="list-photos flex mb-4">
                        <img src={ImgNF} alt="" className="rounded-lg mr-2"/>
                        {/* <img src={ImgNF} alt="" className="rounded-lg mr-2"/> */}
                    </div>
                </div>
                <div className="mb-4 flex">
                    <div className={`flex items-center border border-primary-200 rounded-md w-fit px-4 py-1 ${like && 'bg-primary-200'}`}>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#cc0e0e"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20" stroke="rgb(107 114 128" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <span className={`text-xs font-medium ml-2 ${like && 'text-white'}`}>Helpful ({nbrLike})</span>
                    </div>
                    <div className={`ml-4 flex items-center border border-primary-200 rounded-md w-fit px-4 py-1 ${dislike && 'bg-primary-200'}`}>
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 14V4M8 14L4 14V4.00002L8 4M8 14L13.1956 20.0615C13.6886 20.6367 14.4642 20.884 15.1992 20.7002L15.2467 20.6883C16.5885 20.3529 17.1929 18.7894 16.4258 17.6387L14 14H18.5604C19.8225 14 20.7691 12.8454 20.5216 11.6078L19.3216 5.60779C19.1346 4.67294 18.3138 4.00002 17.3604 4.00002L8 4" stroke="rgb(107 114 128" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <span className={`text-xs font-medium ml-2 ${dislike && 'text-white'}`}>Dislike ({nbrLDslike})</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ReviewCard2;