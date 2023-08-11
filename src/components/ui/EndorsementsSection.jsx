import React from 'react'
import ImgFace from '../../assets/img/avatar-1.jpeg'

const EndorsementsSection = () => {
    return (
        <div className='section'>
            <h1 className='title-section'>The Drive Endorsements</h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-6 mt-10'>
                <div className='flex flex-col items-center'>
                    <img src={ImgFace} alt="" className='rounded-full w-[80px] md:w-[150px] mb-6'/>
                    <p className='text-center font-light text-xs md:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur expedita perferendis quidem explicabo corrupti? Fugit eius qui porro tempore, necessitatibus accusantium optio, consequatur sequi aspernatur dolorum esse eligendi vero animi!</p>
                </div>
                <div className='flex flex-col items-center'>
                    <img src={ImgFace} alt="" className='rounded-full w-[80px] md:w-[150px] mb-6'/>
                    <p className='text-center font-light text-xs md:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur expedita perferendis quidem explicabo corrupti? Fugit eius qui porro tempore, necessitatibus accusantium optio, consequatur sequi aspernatur dolorum esse eligendi vero animi!</p>
                </div>
                <div className='flex flex-col items-center'>
                    <img src={ImgFace} alt="" className='rounded-full w-[80px] md:w-[150px] mb-6'/>
                    <p className='text-center font-light text-xs md:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur expedita perferendis quidem explicabo corrupti? Fugit eius qui porro tempore, necessitatibus accusantium optio, consequatur sequi aspernatur dolorum esse eligendi vero animi!</p>
                </div>
            </div>
        </div>
    )
}

export default EndorsementsSection