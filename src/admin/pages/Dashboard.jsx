import React from 'react'
import SideBar from '../layout/SideBar'
import StickyBox from 'react-sticky-box'

const Dashboard = () => {
    return (
        <div className='grid grid-cols-12 min-h-screen'>
            <aside className='col-span-2 bg-gray-800 pt-10'>
                <StickyBox offsetTop={40} offsetBottom={20}>
                    <SideBar/>
                </StickyBox>
            </aside>
            <main className='col-span-10 px-8'>

                h
            </main>
        </div>
    )
}

export default Dashboard