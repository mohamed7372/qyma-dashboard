import React from 'react'
import CustomButton from '../form/CustomButton'
import Card from './Card'

const IntroSection = () => {
    return (
        <div className='section' id='intro'>
            <Card bgImg={''} css={'h-[230px] w-full col-span-3'} pos='left-1/2 -translate-x-1/2 transform bottom-0'>
                <h3 className='text-center font-bold capitalize text-lg md:text-3xl mb-3'>the sience & art of lonevity</h3>
                <p className='text-center capitalize text-xs md:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti in mollitia enim praesentium asperiores inventore sapiente quis id eius optio doloribus repellat quasi voluptas, voluptatem reprehenderit officiis labore. Sit, atque.</p>
                <CustomButton name={'loremip lroem2 '} css={'m-auto px-4 py-2 mt-6 text-sm'}/>
            </Card>
        </div>
    )
}

export default IntroSection