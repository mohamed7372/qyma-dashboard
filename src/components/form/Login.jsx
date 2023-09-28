import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth'

const Login = () => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        authService
            .login(username, password)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.token)
                localStorage.setItem('id', res.Userid)
                localStorage.setItem('role', res.role)
                localStorage.setItem('name', username)

                navigate('/')
            })
    }

    return (
        <form action="" className='flex flex-col justify-center items-center md:w-1/5' onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='username' className='rounded-md bg-gray-600 text-primary-50 mb-6 w-full outline-none px-4 py-2 border-none' />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' className='rounded-md bg-gray-600 text-primary-50 mb-6 w-full outline-none px-4 py-2 border-none' />
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center'>
                    <input type="checkbox" name="" id="" className='mt-1'/>
                    <p className='ml-2 text-sm'>remember me</p>
                </div>
                <p className='text-sm text-primary-200'>forgot password?</p>
            </div>
            <button className='rounded-lg bg-primary-200  px-4 w-full py-2 mt-10 font-bold'>Login</button>
        </form>
    )
}

export default Login