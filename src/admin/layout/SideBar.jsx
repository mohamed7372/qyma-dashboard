import React from 'react'
import Icon from '../../assets/icons/add.svg';
import IconDashboard from '../../assets/icons/bug.svg';
import IconPodcast from '../../assets/icons/podcasts.svg';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/1.png'

const SideBar = () => {
    const styleSelect = 'border-r-2 border-primary-200'

    const pathname = window.location.pathname;
    
    return (
        <div className='pl-4 2xl:pl-8 mt-4'>
            <img src={Logo} alt="" className='w-[190px]'/>
            <ul>
                <li className={pathname.endsWith('admin') ? styleSelect : ''}>
                    <Item title={'dashboard'} select={pathname.endsWith('admin')} />
                </li>
                <li className={pathname.endsWith('users') ? styleSelect : ''}>
                    <Item select={pathname.includes('articles')} title={'users'} url='/admin/articles'/>
                </li>
                <li className={pathname.includes('bussiness') ? styleSelect : ''}>
                    <Item select={pathname.includes('bussiness')} title={'bussiness'} url='/admin/bussiness'/>
                </li>
                <li className={pathname.includes('topics') ? styleSelect : ''}>
                    <Item select={pathname.includes('analytics')} title={'ads'} url='/admin/topics'/>
                </li>
                <li className={pathname.includes('topics') ? styleSelect : ''}>
                    <Item select={pathname.includes('analytics')} title={'analytics'} url='/admin/topics'/>
                </li>
                <li className={pathname.includes('topics') ? styleSelect : ''}>
                    <Item select={pathname.includes('analytics')} title={'reviews'} url='/admin/topics'/>
                </li>
                <li className={pathname.includes('topics') ? styleSelect : ''}>
                    <Item select={pathname.includes('analytics')} title={'categories'} url='/admin/topics'/>
                </li>
            </ul>
        </div>
    )
}

export default SideBar

const Item = ({ title, url = '/admin', select = false }) => {
    var Img;
    // eslint-disable-next-line default-case
    switch (title) {
        case 'podcasts':
            Img = <img src={IconPodcast} alt="" className='w-[25px] h-[25px] 2xl:w-[30px] 2xl:h-[30px] pt-1' />;
            break;
        default:
            Img = <img src={IconDashboard} alt="" className='w-[25px] h-[25px] 2xl:w-[30px] 2xl:h-[30px] pt-1' />;
    }

    return (
        select
            ? <Link to={url}>
                <div className='flex items-center py-2 my-2 2xl:py-4'>
                    {Img}
                    <p className='capitalize mt-[2px] text-sm 2xl:text-xl ml-2 font-bold text-primary-200'>{title}</p>
                </div>
            </Link>
            : <Link to={url}>
                <div className='flex items-center py-2 my-2 2xl:py-4 hover:bg-primary-200 hover:bg-opacity-40'>
                    {/* <img src={} alt="" className='w-[20px] h-[20px]'/> */}
                    {Img}
                    <p className='capitalize mt-[3px] text-sm 2xl:text-xl ml-2 font-semi-bold'>{title}</p>
                </div>
            </Link>
    )
}