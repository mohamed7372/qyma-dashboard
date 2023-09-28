import React from 'react'
import SideBar from '../layout/SideBar'
import StickyBox from 'react-sticky-box'
import Card from '../components/ui/Card'


import Button from "../components/ui/Button";
import { RatingReviews } from "../components/ui/RatingReviews";
import RelatedCardList from "../components/ui/RelatedCardList";
import ImageName from "../components/ui/ImageName";
import ImgNF from '../../assets/img/image_not_found.jpeg'
import Rating from "../components/ui/Rating";
import Options from '../layout/Options'
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import GalleryPopUp from "../components/ui/GalleryPopUp";
// import { useDispatch, useSelector } from "react-redux";
import bussinessService from "../../services/bussiness";
import reviewService from "../../services/review";
import { useDispatch, useSelector } from 'react-redux';
import { listBussinessActions } from '../../store/bussiness/list-bussiness-slice';
import { bussinessActions } from '../../store/bussiness/bussiness-slice';
import { createLocalStorageManager } from '@chakra-ui/react';
import { listReviewActions } from '../../store/reviews/list-review-slice';


const BussinessDetail = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }, [])
    
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        bussinessService
            .getBussiness(id)
            .then(res => {
                dispatch(bussinessActions.replaceData(res.data.data[0]))
                dispatch(bussinessActions.dataLoading())
            })
        
        reviewService
            .getReviewOfBussiness(id)
            .then(res => {
                dispatch(listReviewActions.replaceData(res.data.data))
                dispatch(listReviewActions.dataLoading())
            })
            .then(err => console.log(err))
    }, [id])

    return (
        <div className='grid grid-cols-12 min-h-screen'>
            <aside className='col-span-2 bg-secondary-200 pt-10'>
                <StickyBox offsetTop={40} offsetBottom={20}>
                    <SideBar/>
                </StickyBox>
            </aside>

            <main className='col-span-10 px-8 mt-10'>
                <Bussiness/>
            </main>
        </div>
    )
}

export default BussinessDetail

const Bussiness = () => {
    const { id } = useParams();

    const [galleryPopUp, showGalleryPopUp] = useState(false)
    const galleryRef = useRef()

    const [relatedBussinessData, setRelatedBussinessData] = useState({})

    useEffect(() => {
        bussinessService
            .getRecommandBussiness(id)
            .then(data => {
                setRelatedBussinessData(data.data.data)
            })
            .catch(err => {
            })    
    }, []);

    // useEffect(() => {
    //     let handler = (e) => {
    //         if (galleryRef.current !== undefined && galleryRef.current !== null) {
    //             if (!galleryRef.current.contains(e.target))
    //                 showGalleryPopUp(false)
    //         }
    //     }
    //     document.addEventListener('mousedown', handler)
    //     return () => {
    //         document.removeEventListener('mousedown', handler)
    //     }
    // })
    
    return (
        <div className="relative">
            <Options />
            {galleryPopUp
                && <div className='fixed bottom-0 left-0 bg-black bg-opacity-60 w-full h-screen z-[60]'>
                    <div ref={galleryRef} className="w-full h-full flex justify-center">
                        {galleryPopUp && <GalleryPopUp/>}

                        <div className="absolute top-14 right-10 cursor-pointer text-white flex items-center group" onClick={()=>showGalleryPopUp(false)}>
                            <p className="capitalize font-bold text-sm text-primary-200 group-hover:underline hidden md:block">close</p>
                            <div className="md:mt-1 ml-2 text-primary-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 md:w-3 h-6 md:h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <ImageBussiness showGalleryPopUp={showGalleryPopUp}/>

            <div className="">
                <div className="content flex justify-between mt-10 px-4 md:px-0">
                    <div className="detail w-full lg:w-3/4">
                        <Card>
                            <About/>
                        </Card>
                        <div className="mt-4"></div>
                        <Card>
                            <ListAmenties/>
                        </Card>
                        <div className="mt-4"></div>
                        <Card>
                            <ListHours/>
                        </Card>
                        <div className="mt-4"></div>
                        <Card>
                            <ListQuestions/>
                        </Card>
                        <div className="mt-4"></div>
                    </div>
                    <div className="info w-1/4 ml-10 hidden lg:block">
                        <StickyBox offsetTop={40} offsetBottom={0} className='mb-4'>
                            <Card className='h-full'>
                                <InfoBussiness/>
                                <Map/>
                            </Card>
                        </StickyBox>

                    </div>
                </div>    
            
                {/* <RatingReviews /> */}
                        
                <Card>
                    <h3 className='text-center md:text-left mt-4 mb-4 font-bold text-2xl px-0 md:px-0'>People Also Viewed</h3>
                    {relatedBussinessData.length !== undefined 
                        ? <RelatedCardList items={relatedBussinessData}/>
                        : <>loading....</>
                    }
                </Card>
            </div>            
        </div>
    );
}

const ImageBussiness = ({ showGalleryPopUp}) => {
    const [love, setLove] = useState(false)
    const bussinessData = useSelector(state => state.bussiness.item);
    const bussinessDataLoading = useSelector(state => state.bussiness.status);

    if (!bussinessDataLoading)
        return (<></>)
    
    const size = bussinessData.cardImages && bussinessData.cardImages.length === 0 ? 0 : bussinessData.cardImages.length
    const imgSrc = bussinessData.cardImages && bussinessData.cardImages.length === 0 ? ImgNF : process.env.REACT_APP_BASE_URL + "\\" + bussinessData.cardImages[0].filePath

    return (
        <div className="relative">
            <div className="relative rounded-lg overflow-hidden">
                <img src={imgSrc} alt="" className='select-none w-full h-[300px] object-cover rounded-lg' />
                <div className="w-full h-full bg-black bg-opacity-50 absolute top-0 left-0"></div>
            </div>
            <div className='md:flex justify-between items-end responsive w-full absolute left-1/2 -translate-x-1/2 transform bottom-8'>
                <div className="px-8 md:px-0">
                    <h1 className="text-4xl text-white font-extrabold mb-4">{bussinessData.name}</h1>
                    <div className="flex items-center">
                        <Rating nbr_star={Math.floor(bussinessData.rate)} square />
                            <p className="text-sm text-gray-200 ml-4">({ bussinessData.nbrRates} rates)</p>
                    </div>
                    <div className="flex">
                        <p className="mt-4 pr-2 text-white font-bold text-sm">Tags : </p>    
                        {bussinessData.tags.map((item, idx) => 
                            <div key={idx} className="flex items-center mt-4 pr-2">
                                <p className="text-white text-sm font-semibold capitalize pr-2 hover:text-primary-200 cursor-pointer">{item.name}</p>
                                {idx % 2 !== 0 && <div className="w-1 h-1 rounded-full bg-white mt-1"></div>}
                            </div>
                        )}
                    </div>    
                    <div className="flex items-center mt-4">
                        <p className="text-red-500 font-bold mr-4">Closed</p>
                        <p className="text-white text-sm font-semibold">12:00 PM - 09:00 PM</p>
                        <a className="ml-4 text-gray-300 bg-black bg-opacity-50 px-2 py-1 rounded-md text-xs" href="#hours">See Hours</a>
                    </div>
                </div>
                <div className="mt-8 md:mt-0 px-8 md:px-0 flex items-center">
                    <button
                        className="text-white h-full mr-4"
                        onClick={() => setLove(!love)}>
                            {!love
                                ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            }
                    </button>
                    {size === 0
                        ?<p
                            className="border rounded-lg text-white font-semibold px-8 py-3 h-full">
                            There is no photos
                        </p>
                        :<button
                            className="border rounded-lg text-white font-semibold px-8 py-3 h-full"
                            onClick={() => showGalleryPopUp(true)}>
                            {`See all ${size} photos`}
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

const About = () => {
    const [showMore, setShowMore] = useState(false);

    const bussinessData = useSelector(state => state.bussiness.item);
    const bussinessDataLoading = useSelector(state => state.bussiness.status);

    if (!bussinessDataLoading)
        return (<></>)

    const toggleShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <div className="about flex flex-col justify-center md:block">
            <h3 className="text-center md:text-left font-bold text-2xl mb-4">About the Bussiness</h3>
            <p className={`text-justify md:text-left text-sm mb-4 w-full ${!showMore && 'bg-gradient-to-t from-[#ffffff] via-secondary-100 to-secondary-100 bg-clip-text'}`}>{ showMore ? bussinessData.description : bussinessData.description.substring(0,300)}</p>
            {bussinessData.description.length > 300 && <div className="w-fit mx-auto md:mx-0">
                <Button title={showMore ? 'Show Less' : 'Read More'} type={0} px='px-20' handleButton={() => toggleShowMore()} />
            </div>}
        </div>
    );
}

const Amenties = ({title ='Health Score PASS'}) => {
    return (
        <div className="flex items-center justify-center md:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="ml-3 text-xs sm:text-sm truncate">{title}</p>
        </div>
    );
}

const ListAmenties = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="amenities flex flex-col justify-center md:block">
            <h3 className="text-center md:text-left font-bold text-2xl mb-4">Amenities and More</h3>
            <ul className="mb-4 grid grid-cols-2 gap-y-2 w-full md:w-2/3 xl:w-1/2">
                <li><Amenties/></li>
                <li><Amenties/></li>
                <li><Amenties/></li>
                <li><Amenties /></li>
                {showMore && <li><Amenties /></li>}
                {showMore && <li><Amenties /></li>}
                {showMore && <li><Amenties /></li>}
                {showMore && <li><Amenties /></li>}
                {showMore && <li><Amenties /></li>}
                {showMore && <li><Amenties /></li>}
                {showMore && <li><Amenties /></li>}
                {showMore && <li><Amenties /></li>}
                {showMore && <li><Amenties /></li>}
                {showMore && <li><Amenties /></li>}
            </ul>
            <div className="mx-auto md:mx-0">
                <Button title={showMore ? 'Show Les' : '10 More Attributes'} type={0} px='px-14' handleButton={()=>setShowMore(!showMore)} />
            </div>
        </div>
    );
}

const Hour = ({item, day}) => {
    return (
        <div className="flex items-center justify-between flex-row">
            <p className="text-center md:text-left  text-sm md:mb-0 font-semibold">{ day} :</p>
            <div className="flex items-center flex-row">
                <p className=" text-xs sm:text-sm">{item[0]}:00</p>
                <p className=" text-xs sm:text-sm mx-2">-</p>
                <p className=" text-xs sm:text-sm">{item[1]}:00</p>
                <p className=" text-xs sm:text-sm mx-2">/</p>
                <p className=" text-xs sm:text-sm">{item[2]}:00</p>
                <p className=" text-xs sm:text-sm mx-2">-</p>
                <p className=" text-xs sm:text-sm">{item[3]}:00</p>
            </div>
        </div>
    );
}

const ListHours = () => {
    const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    
    const bussinessData = useSelector(state => state.bussiness.item);
    const bussinessDataLoading = useSelector(state => state.bussiness.status);

    if (!bussinessDataLoading)
        return (<></>)
    
    return (
        <div className="hours flex flex-col justify-center md:block" id="hours">
            <h3 className="text-center md:text-left font-bold text-2xl mb-4">Hours</h3>
            <ul className="mx-auto md:mx-0 mb-4 grid grid-cols-1 gap-y-2 w-2/3 md:w-1/2">
                {
                    bussinessData.openHours.map((item, idx) => 
                        <li key={idx}><Hour item={item} day={ days[idx]} /></li>
                    )
                }
            </ul>
            <h4 className="text-center md:text-left font-bold text-md mb-4">Upcoming Special Hours</h4>
            <ul className="mx-auto md:mx-0 mb-4 grid grid-cols-1 gap-y-2 w-2/3 md:w-1/2">
                {
                    bussinessData.openHours.map((item, idx) => 
                        <li key={idx}><Hour item={item} day={days[idx]}/></li>
                    )
                }
            </ul>
        </div>
    );
}

const Question = () => {
    return (
        <div>
            <h4 className="text-left font-bold text-sm md:text-md  mb-2">Is Bi-Rite Creamery currently offering delivery or takeout?</h4>
            <p className="text-left  text-xs md:text-sm">Yes, Bi-Rite Creamery offers both delivery and takeout.</p>
        </div>
    );
}

const ListQuestions = () => {
    return (
        <div className="questions flex flex-col items-center md:block">
            <h3 className="text-center md:text-left font-bold text-2xl mb-4">Frequently Asked Questions about Bi-Rite Creamery</h3>

            <ul className="mb-4">
                <li className=""><Question/></li>
                <li className="mt-3"><Question/></li>
                <li className="mt-3"><Question/></li>
            </ul>
        </div>
    )
}

const InfoBussiness = () => {
    const bussinessData = useSelector(state => state.bussiness.item);
    const bussinessDataLoading = useSelector(state => state.bussiness.status);

    if (!bussinessDataLoading)
        return (<></>)
    
    const imgSrc = process.env.REACT_APP_BASE_URL + "\\" + bussinessData.user.image.filePath

    return (
        <div className="bg-primary-200 bg-opacity-20 rounded-lg p-4">
            <header className="flex justify-start items-center">
                <ImageName img={imgSrc} alt={bussinessData.name} />
                <div className="names ml-3">
                    <p className="text-sm font-semibold">{ bussinessData.name}</p>
                    <p className="text-xs text-primary-150">@{ bussinessData.user.username}</p>
                </div>
            </header>
            <hr className="mt-4"/>
            {/* <div className="mt-4">
                <Amenties title={bussinessData.email}/>
                <Amenties title={bussinessData.phoneNumber}/>
            </div> */}
            <div className="buttons mt-4">
                <a href={`tel:+${bussinessData.phoneNumber}`}>
                    <Button title='Call me' px='w-full' />
                </a>
                <div className="mt-2"></div>
                <a href='#add-review'>
                    <Button title='Add Reviews' type={0} px='w-full' />
                </a>
            </div>
        </div>
    );
}

const Map = () => {
    const bussinessData = useSelector(state => state.bussiness.item);
    const bussinessDataLoading = useSelector(state => state.bussiness.status);

    console.log(bussinessData);
    if (!bussinessDataLoading || bussinessData.positions === 0)
        return (<></>)

    return (
        <div className="mt-4 bg-primary-200 bg-opacity-20 rounded-lg">
            <div className="p-4">
                <h5 className="text-sm font-bold">Address</h5>
                <p className="text-xs text-gray-500">{ bussinessData.positions[0].address}</p>
            </div>
            <iframe
                src={`https://maps.google.com/maps?q=${bussinessData.positions[0].latitude},${bussinessData.positions[0].longitude}&hl=es;&output=embed`}
                width="100%" height="280" loading="lazy"></iframe>
        </div>
    );
}