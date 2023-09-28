import React from 'react'
import { useState } from 'react'
import authService from '../../services/auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        authService
            .register(fullname, email, username, password)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.token)
                localStorage.setItem('id', res.Userid)
                localStorage.setItem('role', res.role)
                localStorage.setItem('username', username)
                localStorage.setItem('name', fullname)

                navigate('/')
            })
    }

    return (
        <form action="" className='flex flex-col justify-center items-center md:w-1/5' onSubmit={handleSubmit}>
            <input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)} className='rounded-md bg-gray-600 text-gray-300 mb-6 w-full outline-none px-4 py-2 border-none' />
            <input type="text" placeholder='fullname' value={fullname} onChange={(e)=>setFullname(e.target.value)} className='rounded-md bg-gray-600 text-gray-300 mb-6 w-full outline-none px-4 py-2 border-none' />
            <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='rounded-md bg-gray-600 text-gray-300 mb-6 w-full outline-none px-4 py-2 border-none' />
            <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='rounded-md bg-gray-600 text-gray-300 mb-6 w-full outline-none px-4 py-2 border-none' />
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