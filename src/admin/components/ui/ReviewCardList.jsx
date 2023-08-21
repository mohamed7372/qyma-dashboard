// import ReviewCard from "./ReviewCard";
import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useSelector } from "react-redux";
// import Error from "../../layouts/Error";

// import {Swiper, SwiperSlide} from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
// import 'swiper/swiper-bundle.min.css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { A11y, Navigation, Pagination } from 'swiper';

const ReviewCardList = () => {
    // const cartReviewItems = useSelector(state => state.cartReview.itemsList)
    // const loading = useSelector(state => state.cartReview.loading)
    // const error = useSelector(state => state.cartReview.error)

    // const [width, setWidth] = useState(0)
    // const [select, setSelect] = useState(1)

    // const [swiperRef, setSwiperRef] = useState(null);
    
    return null;
    
    if (error) 
        return (
            <div className="my-20 w-full h-large flex justify-between bg-primary-50">
            <div className="responsive flex flex-col sm:flex-row items-center overflow-hidden">
                <div className="flex flex-col justify-center h-full w-full px-4 sm:px-0 sm:w-1/3">
                    <h1 className="mt-8 sm:mt-0 uppercase text-3xl text-secondary-100 font-extrabold mb-8 flex md:flex-col justify-center items-center sm:items-start">
                        <p className="">our recent</p>
                        <p className="">activity </p>
                        <span className="text-primary-200 ">reviews</span>
                    </h1>
                    <p className="text-sm font-light mb-4 text-center px-4 sm:text-left sm:px-0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. In voluptates possimus eos, quam dolor vel facilis ad quis ut quasi.</p>
                    <p className="text-3xl text-secondary-100 font-semibold hidden sm:block">0{ select}<span className="font-light text-xs">/00</span></p>
                    <div className="mt-4 hidden sm:block">
                        {/* <button className={`rounded-md ${select === 1 ? 'bg-primary-150 cursor-default' : 'bg-primary-200'} p-2 mr-2`} onClick={handlePrevCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <button className={`rounded-md ${select === cartReviewItems.length ? 'bg-primary-150 cursor-default' : 'bg-primary-200'} p-2`} onClick={handleNextCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button> */}
                    </div>
                </div>

                <div className="h-full w-2/3 items-center justify-center overflow-hidden ml-20 hidden sm:flex">
                    <Error />
                </div>
            </div>
        </div>
        )

    // const [controlledSwiper, setControlledSwiper] = useState(null);

    // const buttonPrevRef = useRef(null);
    // const buttonNextRef = useRef(null);

    // function prevHandler() {
    //     buttonPrevRef.current.click();
    // }

    // function nextHandler() {
    //     buttonNextRef.current.click();
    // }

    return (
        <div className="responsive bg-primary-50">
            <div className="my-20 w-full pb-4 md:pb-4 md:h-large flex flex-col md:flex-row items-center justify-between bg-primary-50 md:px-0">
                <div className="flex flex-col justify-center h-full w-full md:px-4 sm:px-0 sm:w-1/3">
                    <h1 className="mt-8 sm:mt-0 uppercase md:text-3xl text-secondary-100 font-extrabold mb-4 md:mb-8 flex md:flex-col justify-center items-center sm:items-start">
                        <p>our recent</p>
                        <p className="mx-1 md:mx-0">activity </p>
                        <span className="text-primary-200">reviews</span>
                    </h1>
                    <p className="text-sm font-light mb-4 text-center px-4 sm:text-left sm:px-0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. In voluptates possimus eos, quam dolor vel facilis ad quis ut quasi.</p>
                    <p className="text-3xl text-secondary-100 font-semibold hidden sm:block">0{ select}<span className="font-light text-xs">/0{ cartReviewItems.length}</span></p>
                    <div className="mt-4 hidden sm:block swiper-nav-btns">
                        {/* <button className={`rounded-md ${select === 1 ? 'bg-primary-150 cursor-default' : 'bg-primary-200'} p-2 mr-2`} onClick={() => prevHandler()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-4 h-4" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <button className={`rounded-md ${select === cartReviewItems.length ? 'bg-primary-150 cursor-default' : 'bg-primary-200'} p-2`} onClick={() => nextHandler()}> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffffff" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button> */}
                    </div>
                </div>
                    <Swiper
                        spaceBetween={60}
                        slidesPerView={2}
                        modules={[Navigation, Pagination, A11y]}
                        onSwiper={swiper => setSwiperRef(swiper)}
                        className="hidden md:block px-0 w-2/3 h-fit"
                    >
                        {
                            cartReviewItems.map(item =>
                                <SwiperSlide key={item.id} className="h-fit ">
                                    <ReviewCard review={item}/>
                                </SwiperSlide>
                            )
                        }    
                        {/* <SwiperNavButtons select={select} setSelect={setSelect} cartReviewItems={cartReviewItems} refNext={buttonNextRef} refPrev={buttonPrevRef}/> */}
                    </Swiper>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        onSwiper={swiper => setSwiperRef(swiper)}
                        className="md:hidden w-full px-4 h-fit"
                    >
                        {
                            cartReviewItems.map(item =>
                                <SwiperSlide key={item.id} className="h-fit ">
                                    <ReviewCard review={item}/>
                                </SwiperSlide>
                            )
                        }    
                    </Swiper>

                
            </div>
        </div>
    );
}

export default ReviewCardList;


const SkeletonCard = () => {
    return (
        <div className='rounded-3xl p-8 bg-white shadow-sm hover:shadow-lg'>
            <header className='relative pt-12 flex flex-col items-center'>
                <div className="w-24 h-24 bg-gray-400 rounded-full animate-pulse absolute -top-20 left-1/2 transform -translate-x-1/2"></div>
                <p className='text-sm mb-1 font-extralight'>David Ken</p>
                <div className="w-1/2 mt-2 skeleton"></div>
            </header>
            <main className='mt-8'>
                <h3 className='text-xl font-bold mb-3 cursor-pointer skeleton-medium w-2/3'></h3>
                <p className='text-xs mb-1 text-gray-400 skeleton w-1/3'></p>
                <p className='text-sm text-gray-600 skeleton mb-2 mt-6'></p>
                <p className='text-sm text-gray-600 skeleton mb-2'></p>
                <p className='text-sm text-gray-600 skeleton mb-2'></p>
                <p className='text-sm text-gray-600 skeleton mb-2'></p>
                <p className='text-sm text-gray-600 skeleton'></p>
                <hr className='mt-4'/>
            </main>
            <footer className='flex justify-end mt-4'>
                <div className='flex mr-8'>
                    {/* <p className='text-xs mr-2'>{review.reviewNote}</p> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                </div>
                <div className='flex'>
                    {/* <p className='text-xs mr-2'>{review.nbrComment}</p> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>      
                </div>
            </footer>
        </div>
    );
}


const SwiperNavButtons = ({ select, setSelect, cartReviewItems, refNext, refPrev }) => {
    const swiper = useSwiper();

    const prevHandler = () => {
        if (select == 1)
            return
        setSelect(s => s - 1);
        swiper.slidePrev()
    };
    
    const nextHandler = () => {
        if (select == cartReviewItems.length)
            return
        setSelect(s => s + 1);
        swiper.slideNext()
    };

    return (
        <div className="mt-4 hidden swiper-nav-btns">
            <button
                ref={refPrev}
                className={`rounded-md ${select === 1 ? 'bg-primary-150 cursor-default' : 'bg-primary-200'} p-2 mr-2`} onClick={() => prevHandler()}>
            </button>
            <button
                ref={refNext}
                className={`rounded-md ${select === cartReviewItems.length ? 'bg-primary-150 cursor-default' : 'bg-primary-200'} p-2`} onClick={() => nextHandler()}> 
            </button>
        </div>
    )
}