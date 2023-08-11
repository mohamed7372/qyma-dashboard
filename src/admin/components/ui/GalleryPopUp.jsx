import React from 'react'
import ReactImageGallery from 'react-image-gallery';
import { useSelector } from 'react-redux';

const GalleryPopUp = () => {
    const bussinessData = useSelector(state => state.bussiness.item);
    const bussinessDataLoading = useSelector(state => state.bussiness.status);

    if (!bussinessDataLoading)
        return (<></>)

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className='animate-slideDown w-full mx-4 h-[90%] bg-gray-200 rounded-lg pb-0 overflow-hidden relative'>
                <div className='px-6 pt-6 bg-white'>
                    <h1 className='font-bold text-sm md:text-xl text-gray-800 pb-4'>{'Photos for ' + bussinessData.title}</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-200 px-6 py-4 overflow-y-scroll h-[86%] rounded-lg'>
                    {
                        bussinessData.cardImages.map(item =>
                            <img src={process.env.REACT_APP_BASE_URL + '/' + item.filePath} alt={item.name} key={item.id}/>
                            )
                    }
                </div>
                <div className='absolute bottom-4 transform left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-3 flex cursor-pointer items-center hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
                    </svg>
                    <p className='font-semibold text-xs'>Back to top</p>
                </div>
            </div>
        </div>
    )
}

export default GalleryPopUp