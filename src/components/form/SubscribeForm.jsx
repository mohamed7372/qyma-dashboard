import React from 'react'
import CustomButton from './CustomButton'

const SubscribeForm = ({css='justify-center md:justify-start'}) => {
    return (
        <form action="" className={`flex mt-4 md:mt-0 ${css}`}>
            <input type="text" className='rounded-lg w-1/2 px-4 text-sm outline-none text-black' placeholder='your email'/>
            <CustomButton name={'sign up'} css={'px-4 font-medium py-2 rounded-lg ml-4 text-sm'}/>
        </form>
    )
}

export default SubscribeForm