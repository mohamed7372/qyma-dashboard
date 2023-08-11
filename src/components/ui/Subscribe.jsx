import React from 'react'
import SubscribeForm from '../form/SubscribeForm'

const Subscribe = () => {
    return (
        <div className=''>
            <hr />
            <h2 className='text-center uppercase font-bold text-xl mt-10 mb-6'>SIGN UP TO RECEIVE PETER'S EXPERTISE IN YOUR INBOX</h2>
            <p className='text-center w-3/4 mb-10 m-auto'>Sign up to receive the 5 tactics in my Longevity Toolkit, followed by non-lame, weekly emails on the latest strategies and tactics for increasing your lifespan, healthspan, and well-being (plus new podcast announcements).</p>
            <SubscribeForm css='justify-center' />
        </div>
    )
}

export default Subscribe