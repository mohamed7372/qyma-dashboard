import React from 'react'
import Card from './Card'
import CustomButton from '../form/CustomButton'
import { Link } from 'react-router-dom'

const PodcastSection = () => {
    return (
        <div className='section'>
            <h1 className='title-section'>the kool health podcast</h1>
            <p className='text-xs md:text-sm mt-4 text-center w-full md:w-2/3 m-auto font-light'>he Drive is hosted by Dr. Peter Attia, a Stanford/Johns Hopkins/NIH-trained physician focusing on the applied science of longevity, the extension of human life, and well-being. With over 50 million episodes downloaded, it features topics including exercise, nutritional biochemistry, cardiovascular disease, Alzheimer’s disease, cancer, mental health, and much more.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mt-10'>
                <Card bgImg={'image 5.png'} css={'h-[200px] md:h-[300px]'} pos='bottom-0'>
                    <h3 className='font-bold capitalize text-xl mb-1'>All podcast episodes</h3>
                    <p className='font-light text-sm'>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, fuga.</p>
                    <Link to={'./podcasts'}>
                        <CustomButton name={'show podcasts'} css={'px-4 py-2 mt-6 text-sm'} />
                    </Link>
                </Card>
                <Card bgImg={'image 2.png'} css={'h-[200px] md:h-[300px]'} pos='bottom-0'>
                    <h3 className='font-bold capitalize text-xl mb-1'>all notes</h3>
                    <p className='font-light text-sm'>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, fuga.</p>
                    <CustomButton name={'show notes'} css={'px-4 py-2 mt-6 text-sm'}/>
                </Card>
            </div>
        </div>
    )
}

export default PodcastSection