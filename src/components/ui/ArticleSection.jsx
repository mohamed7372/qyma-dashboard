import React from 'react'
import Card from './Card'
import CustomButton from '../form/CustomButton'

const ArticleSection = () => {
    return (
        <div className='section'>
            <h1 className='title-section'>Popular Articles</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 md:gap-y-6 mt-10'>
                <Card bgImg={''} css={'h-[300px] w-full md:col-span-3'} pos='bottom-0'>
                    <h3 className='font-bold capitalize text-xl mb-1'>the sience & art of lonevity</h3>
                    <p className='capitalize text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti in mollitia enim praesentium asperiores inventore sapiente quis id eius optio doloribus repellat quasi voluptas, voluptatem reprehenderit officiis labore. Sit, atque.</p>
                    <CustomButton name={'loremip lroem2 '} css={'px-4 py-2 mt-6 text-sm'}/>
                </Card>
                <Card bgImg={''} css={'h-[150px] w-full'} pos='bottom-0'>
                    <h3 className='font-bold capitalize text-xl mb-1'>the sience & art of lonevity</h3>
                    <p className='capitalize text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti in mollitia enim praesentium asperiores inventore sapiente quis id eius optio doloribus repellat quasi voluptas, voluptatem reprehenderit officiis labore. Sit, atque.</p>
                    <CustomButton name={'loremip lroem2 '} css={'px-4 py-2 mt-6 text-sm'}/>
                </Card>
                <Card bgImg={''} css={'h-[325px] w-full row-span-2'} pos='bottom-0'>
                    <h3 className='font-bold capitalize text-xl mb-1'>the sience & art of lonevity</h3>
                    <p className='capitalize text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti in mollitia enim praesentium asperiores inventore sapiente quis id eius optio doloribus repellat quasi voluptas, voluptatem reprehenderit officiis labore. Sit, atque.</p>
                    <CustomButton name={'loremip lroem2 '} css={'px-4 py-2 mt-6 text-sm'}/>
                </Card>
                <Card bgImg={''} css={'h-[150px] w-full'} pos='bottom-0'>
                    <h3 className='font-bold capitalize text-xl mb-1'>the sience & art of lonevity</h3>
                    <p className='capitalize text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti in mollitia enim praesentium asperiores inventore sapiente quis id eius optio doloribus repellat quasi voluptas, voluptatem reprehenderit officiis labore. Sit, atque.</p>
                    <CustomButton name={'loremip lroem2 '} css={'px-4 py-2 mt-6 text-sm'}/>
                </Card>
                <Card bgImg={''} css={'h-[150px] w-full'} pos='bottom-0'>
                    <h3 className='font-bold capitalize text-xl mb-1'>the sience & art of lonevity</h3>
                    <p className='capitalize text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti in mollitia enim praesentium asperiores inventore sapiente quis id eius optio doloribus repellat quasi voluptas, voluptatem reprehenderit officiis labore. Sit, atque.</p>
                    <CustomButton name={'loremip lroem2 '} css={'px-4 py-2 mt-6 text-sm'}/>
                </Card>
                <Card bgImg={''} css={'h-[150px] w-full'} pos='bottom-0'>
                    <h3 className='font-bold capitalize text-xl mb-1'>the sience & art of lonevity</h3>
                    <p className='capitalize text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti in mollitia enim praesentium asperiores inventore sapiente quis id eius optio doloribus repellat quasi voluptas, voluptatem reprehenderit officiis labore. Sit, atque.</p>
                    <CustomButton name={'loremip lroem2 '} css={'px-4 py-2 mt-6 text-sm'}/>
                </Card>
            
                
            </div>
        </div>
    )
}

export default ArticleSection



