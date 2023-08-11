import React from 'react'
import SideBar from '../layout/SideBar'
import StickyBox from 'react-sticky-box'
import PodcastDetail from '../../pages/PodcastDetail'
import Card from '../components/ui/Card'
import ArticleDetail from '../../pages/ArticleDetail'

const ArticleAdminDetail = () => {
    return (
        <div className='grid grid-cols-12 min-h-screen'>
            <aside className='col-span-2 bg-gray-800 pt-10'>
                <StickyBox offsetTop={40} offsetBottom={20}>
                    <SideBar/>
                </StickyBox>
            </aside>
            <main className='col-span-10 px-8'>
                <Card>
                    <ArticleDetail admin={ true} />
                </Card>
            </main>
        </div>
    )
}

export default ArticleAdminDetail