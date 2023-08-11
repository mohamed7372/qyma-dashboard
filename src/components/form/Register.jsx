import React from 'react'

const Register = () => {
    return (
        <form action="" className='flex flex-col justify-center items-center w-1/5'>
            <input type="text" placeholder='username' className='rounded-md bg-gray-600 text-primary-50 mb-6 w-full outline-none px-4 py-2 border-none' />
            <input type="email" placeholder='email' className='rounded-md bg-gray-600 text-primary-50 mb-6 w-full outline-none px-4 py-2 border-none' />
            <input type="password" placeholder='password' className='rounded-md bg-gray-600 text-primary-50 mb-6 w-full outline-none px-4 py-2 border-none' />
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center'>
                    <input type="checkbox" name="" id="" className='mt-1'/>
                    <p className='ml-2 text-sm'>remember me</p>
                </div>
                <p className='text-sm text-primary-200'>forgot password?</p>
            </div>
            <button className='rounded-lg bg-primary-200  px-4 w-full py-2 mt-10 font-bold'>Register</button>
        </form>
    )
}

export default Register