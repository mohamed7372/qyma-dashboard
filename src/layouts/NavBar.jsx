import React, { useEffect } from 'react'
import CustomButton from '../components/form/CustomButton'
import { Link } from 'react-router-dom'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import categoriesService from '../services/categories'
import { listCategoryActions } from '../store/category/list-category-slice'
import { useState } from 'react'
import IconDown from '../assets/icons/down.svg'

const NavBar = () => {
    const dispatch = useDispatch()

    const [categories, setCategories] = useState([])

    useEffect(() => {
        categoriesService
            .getAll()
            .then(res => {
                setCategories(res.categories)
            })
    }, [])

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`w-full fixed z-50 left-0 top-6 ${scrolled ? 'bg-gray-700' : ''}`}>
            <div className='flex items-center responsive py-4'>
                <h1 className='text-2xl font-bold w-1/2'>
                    <Link to={'/'}>Kool health podcast</Link>
                </h1>
                <div className='flex justify-between w-1/2 items-center'>
                    <ul className='flex justify-between w-3/5 items-center mr-8'>
                        <li className='capitalize font-medium cursor-pointer'>
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                        <MenuButton isActive={isOpen} as={null} rightIcon={null}>
                                            <div className='flex items-center'>
                                                <p>Topics</p>
                                                <img src={IconDown} alt='' className='ml-2 w-3 mt-1' />
                                            </div>
                                        </MenuButton>
                                        <MenuList
                                            border={'none'}
                                            bgColor={'#202937'}>
                                            {categories && categories.map(item =>
                                                <MenuItem key={item._id} bgColor={'#202937'} width={'100%'}>
                                                    <Link to={`/topics/${item._id}`} className='w-full'>
                                                        {item.title}
                                                    </Link>
                                                </MenuItem>
                                            )}
                                            <MenuItem bgColor={'#202937'} borderTopWidth={'1px'} pt={'10px'} mt={'10px'} width={'100%'}>
                                                <Link to={'/topics'} className='w-full'>
                                                    All Topics
                                                </Link>
                                            </MenuItem>
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </li>
                        <li className='capitalize font-medium cursor-pointer'>
                            <Link to='/podcasts'>podcasts</Link>
                        </li>
                        <li className='capitalize font-medium cursor-pointer'>
                            <Link to='/articles'>articles</Link>
                        </li>
                        <li className='capitalize font-medium cursor-pointer'>
                            <Link to='/notes'>notes</Link>
                        </li>
                    </ul>
                    <div className='flex items-center'>
                        <CustomButton name={'Login'} css={'px-4 py-2'} cssTitle={'text-white'} href={'./login'} />
                        <div className='mx-2'></div>
                        <CustomButton name={'Register'} css={'bg-white px-4 py-2'} cssTitle={'text-primary-200'} href={'./register'}/>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NavBar