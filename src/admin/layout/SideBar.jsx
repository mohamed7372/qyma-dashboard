import React from 'react'
import Icon from '../../assets/icons/add.svg';
import IconDashboard from '../../assets/icons/bug.svg';
import IconPodcast from '../../assets/icons/podcasts.svg';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/1.png'
import axios from 'axios';
import { useState } from 'react';

const SideBar = () => {
    const styleSelect = 'border-r-2 border-primary-200'

    const pathname = window.location.pathname;
    
    const url = process.env.REACT_APP_API_URL
    const handleLogin = () => {
        localStorage.setItem('token', '6|kf9c5urF5KIq4IgNMGNnDhjKY9SBrU5N3gdSWePf')
        // axios
        //     .post(`${url}/login`,
        //     {
        //         "username": "ramzi_test1",
        //         "password" : "testtest"
        //     })
        //     .then((response) => console.log(response))
    }

    const [file, setFile] = useState(null)

    // const handleFile = async e => {
    //     setFile(e.target.files[0])

    //     try {
    //   const response = await fetch('https://qima-dzair.ramzi-issiakhem.com/api/v1/category/create', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         userId : 1,
    //         name : 'fast-foodaa235301',
    //         displayName : 'Bouffe Rapide',
    //         displayNameAr : 'مطعم',
    //         displayNameEn : 'Fast Food',
    //         description : 'Description',
    //         descriptionAr : 'مطعم',
    //         descriptionEn: 'Fast Food',
    //         image: e.target.files[0]
    //     })
    //   });

    //   if (response.ok) {
    //     console.log('Data sent successfully');
    //     // handle success
    //   } else {
    //     console.error('Error sending data:', response.status);
    //     // handle error
    //   }
    // } catch (error) {
    //   console.error('Error sending data:', error);
    //   // handle error
    // }
        
    //     // axios.post('https://qima-dzair.ramzi-issiakhem.com/api/v1/category/create', {
    //     //     userId : 1,
    //     //     name : 'fast-foodaa235301',
    //     //     displayName : 'Bouffe Rapide',
    //     //     displayNameAr : 'مطعم',
    //     //     displayNameEn : 'Fast Food',
    //     //     description : 'Description',
    //     //     descriptionAr : 'مطعم',
    //     //     descriptionEn: 'Fast Food',
    //     //     image: e.target.files[0]
    //     // })
    //     //     .then(res => console.log('good, ', res))
    //     // .then(err => console.log(err))
    // }

    const handleFile = async (e) => {
        const formData = new FormData();
            formData.append('userId', '1')
            formData.append('name', 'fast-foodaa2zd353err')
            formData.append('displayName', 'Bouffe Rapide')
            formData.append('displayNameAr', 'مطعم')
            formData.append('displayNameEn', 'Fast Food')
            formData.append('description', 'Description')
            formData.append('descriptionAr', 'مطعم')
            formData.append('descriptionEn', 'Fast Food')
            
        
        axios.post(
            'https://qima-dzair.ramzi-issiakhem.com/api/v1/category/create',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer 18|aVIZebIfcrPrLXfVkkbt2EwIJS0GEFWKgpbRwKVD'
                }
            }
        ).then(res => console.log(res))

        
    };

    return (
        <div className='pl-4 2xl:pl-8 mt-4'>
            <img src={Logo} alt="" className='w-[190px]'/>
            <ul>
                <li className={pathname.endsWith('admin') ? styleSelect : ''}>
                    <Item title={'dashboard'} select={pathname.endsWith('admin')} />
                </li>
                <li className={pathname.endsWith('users') ? styleSelect : ''}>
                    <Item select={pathname.includes('users')} title={'users'} url='/admin/users'/>
                </li>
                <li className={pathname.includes('bussiness') ? styleSelect : ''}>
                    <Item select={pathname.includes('bussiness')} title={'bussiness'} url='/admin/bussiness'/>
                </li>
                <li className={pathname.includes('ads') ? styleSelect : ''}>
                    <Item select={pathname.includes('ads')} title={'ads'} url='/admin/ads'/>
                </li>
                <li className={pathname.includes('analytics') ? styleSelect : ''}>
                    <Item select={pathname.includes('analytics')} title={'analytics'} url='/admin/analytics'/>
                </li>
                <li className={pathname.includes('reviews') ? styleSelect : ''}>
                    <Item select={pathname.includes('reviews')} title={'reviews'} url='/admin/reviews'/>
                </li>
                <li className={pathname.includes('categories') ? styleSelect : ''}>
                    <Item select={pathname.includes('categories')} title={'categories'} url='/admin/categories'/>
                </li>
                <li>
                    <p onClick={handleLogin}>login</p>
                </li>
                <li>
                    {/* <input type="file" name="" id="" onChange={handleFile}/> */}
                    <p onClick={handleFile}>test api</p>
                </li>

                <li className=''>
                    <div className="w-40 h-40 bg-red-200 place-content-center grid"><p className='w-fit h-fit bg-blue-400'>1</p></div>
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