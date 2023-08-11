import React from 'react'
import Login from '../components/form/Login'
import Register from '../components/form/Register'
import { Link } from 'react-router-dom'

const Auth = () => {
    const path = window.location.pathname

    if(path.includes('login'))
        return (
            <div className='h-screen flex justify-center items-center flex-col'>
                <img src="" alt="logo" />
                <h1 className='capitalize font-bold text-4xl mt-10 mb-6'>sign in</h1>
                <p className='mb-16'>Sign in  and start listening our podcasts & reading last articles</p>
                <Login />
                <p className='text-sm mt-10'>You don't have an account ?
                    <Link to={'/register'}>
                        <span className='ml-2 text-primary-200 hover:underline'>create an account</span>
                    </Link>
                </p>
            </div>
        )
    return (
        <div className='h-screen flex justify-center items-center flex-col'>
            <img src="" alt="logo" />
            <h1 className='capitalize font-bold text-4xl mt-10 mb-6'>register</h1>
            <p className='mb-16'>Register  and start listening our podcasts & reading last articles</p>
            <Register />
            <p className='text-sm mt-10'>Already have an account ?
                <Link to={'/login'}>
                    <span className='ml-2 text-primary-200 hover:underline'>sign in</span>
                </Link>
            </p>
        </div>
    )
}

export default Auth