import React, { forwardRef, useEffect, useRef, useState } from 'react'
import NavBar from '../layouts/NavBar'
import Footer from '../layouts/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { listCategoryActions } from '../store/category/list-category-slice'
import TopicCard from '../components/ui/TopicCard'
import categoriesService from '../services/categories'
const Notes = () => {
    const [gridDisplay, setGridDisplay] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className=' min-h-screen'>
            <nav className='pt-32'>
                <NavBar />
            </nav>

            <main className='responsive'>
                <h1 className='font-extrabold capitalize text-xl md:text-3xl mb-8 text-center md:text-left'>All Topics</h1>
                <p>This website, my podcast, and my weekly email newsletter all focus on translating the science of longevity into something accessible, digestible, and actionable for everyone.
                    To learn more about my framework for longevity, and the 5 tactics in my Longevity Toolkit, sign up for my free email newsletter. You can also watch the video on my start here page.
                </p>

                <h1 className='font-extrabold capitalize text-xl md:text-3xl mb-8 text-center md:text-left mt-8'>Top Topics</h1>
                <ListTopics gridDisplay={gridDisplay} />

                <h1 className='font-extrabold capitalize text-xl md:text-xl mb-4 text-center md:text-left'>Diseases & Conditions: Prevention tactics, treatments, and more</h1>
                <p className='text-sm font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ex dolore obcaecati consectetur illum quos distinctio, tempore, quis vero dolorem unde! Labore magni perferendis hic modi maxime, rem fuga repellendus quaerat dolore quidem deserunt sint vero? Deleniti ea esse eius, quas quis quod? Ullam corporis, itaque sapiente nihil non distinctio repellendus optio quasi iure. Eos fugit consequuntur maiores voluptatum officia harum architecto sint soluta labore doloribus fuga repudiandae impedit ad repellendus incidunt doloremque, inventore sed. Id quibusdam est animi excepturi. Porro distinctio sed molestias voluptatem fugit, quia vel omnis debitis cumque molestiae excepturi magni architecto et inventore deleniti quae. Incidunt.</p>
                <ListTopics gridDisplay={gridDisplay} />

                <h1 className='font-extrabold capitalize text-xl md:text-xl mb-4 text-center md:text-left'>Diseases & Conditions: Prevention tactics, treatments, and more</h1>
                <p className='text-sm font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ex dolore obcaecati consectetur illum quos distinctio, tempore, quis vero dolorem unde! Labore magni perferendis hic modi maxime, rem fuga repellendus quaerat dolore quidem deserunt sint vero? Deleniti ea esse eius, quas quis quod? Ullam corporis, itaque sapiente nihil non distinctio repellendus optio quasi iure. Eos fugit consequuntur maiores voluptatum officia harum architecto sint soluta labore doloribus fuga repudiandae impedit ad repellendus incidunt doloremque, inventore sed. Id quibusdam est animi excepturi. Porro distinctio sed molestias voluptatem fugit, quia vel omnis debitis cumque molestiae excepturi magni architecto et inventore deleniti quae. Incidunt.</p>
                <ListTopics gridDisplay={gridDisplay} />

                <h1 className='font-extrabold capitalize text-xl md:text-xl mb-4 text-center md:text-left'>Diseases & Conditions: Prevention tactics, treatments, and more</h1>
                <p className='text-sm font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, ex dolore obcaecati consectetur illum quos distinctio, tempore, quis vero dolorem unde! Labore magni perferendis hic modi maxime, rem fuga repellendus quaerat dolore quidem deserunt sint vero? Deleniti ea esse eius, quas quis quod? Ullam corporis, itaque sapiente nihil non distinctio repellendus optio quasi iure. Eos fugit consequuntur maiores voluptatum officia harum architecto sint soluta labore doloribus fuga repudiandae impedit ad repellendus incidunt doloremque, inventore sed. Id quibusdam est animi excepturi. Porro distinctio sed molestias voluptatem fugit, quia vel omnis debitis cumque molestiae excepturi magni architecto et inventore deleniti quae. Incidunt.</p>
                <ListTopics gridDisplay={gridDisplay} />
            </main>


            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Notes

const ListTopics = ({ gridDisplay }) => {
    const listCategory = useSelector(state => state.listCategory.itemsList)
    const statusListCategory = useSelector(state => state.listCategory.status)

    return (
        <div className='mt-10 mb-20'>
            <div className={`grid ${gridDisplay ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1'} gap-x-10 gap-y-6 mb-10`}>
                {
                    statusListCategory && listCategory.map(item =>
                        <TopicCard key={item._id} item={item} grid={gridDisplay} />
                    )
                }
            </div>

            {/* <Pagination/> */}
        </div>
    )
}