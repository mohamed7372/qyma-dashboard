import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useToast,
} from '@chakra-ui/react'
import Badge from './Badge'
import IconBin from '../../../assets/icons/bin.svg';
import IconShow from '../../../assets/icons/show.svg'
import IconEdit from '../../../assets/icons/edit.svg'

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import episodeService from '../../../services/episode';
import { Switch } from '@chakra-ui/react'
import categoriesService from '../../../services/categories';
import {listBussinessActions} from '../../../store/bussiness/list-bussiness-slice.js'

const CategoriesTable = () => {
    const listBussiness = useSelector(state => state.listBussiness.itemsList)
    const statusListBussiness = useSelector(state => state.listBussiness.status)

    const dispatch = useDispatch();

    const toast = useToast()

    // const [msgToast, setMsgToast] = useState('')
    // const [typeToast, setTypeToast] = useState('')
    // const [titleToast, setTitleToast] = useState('')
    
    // // show toast msg 
    // useEffect(() => {
    //     if (msgToast && titleToast && typeToast) {
    //         toast({
    //             title: titleToast,
    //             description: msgToast,
    //             status: typeToast,
    //             duration: 5000,
    //             isClosable: true,
    //         })
    //     }

    // }, [msgToast, titleToast, typeToast])

    if (!statusListBussiness)
        return null;


    const handleDelete = (id, number) => {
        categoriesService
            .deleteEpisode(id)
            .then(res => {
                episodeService
                .getAll()
                .then((res) => {
                    // setTypeToast('success') 
                    // setTitleToast('Podcast deleted.')
                    // setMsgToast(`We\'ve delete podcast ${number} for you.`);

                    dispatch(listBussinessActions.replaceData(res.episodes));    
                    dispatch(listBussinessActions.dataLoading());    
                }).catch((err) => {
                    console.log(err);                
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    const toggleStatus = (id, number) => {
        episodeService
            .toggleEpisode(id)
            .then(res => {
                episodeService
                .getAll()
                .then((res) => {
                    // setTypeToast('success') 
                    // setTitleToast('Podcast updated.')
                    // setMsgToast(`We\'ve change podcast ${number} status for you.`);

                    dispatch(listBussinessActions.replaceData(res.episodes));    
                    dispatch(listBussinessActions.dataLoading());    
                }).catch((err) => {
                    console.log(err);                
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    

    console.log(listBussiness);

    return (
        <TableContainer className='w-full bg-primary-200 bg-opacity-20 rounded-xl'>
            <Table variant='simple' className='w-full'>
                <Thead>
                    <Tr className='text-left uppercase text-xs font-semibold'>
                        <Th className='!text-primary-100 py-3 pl-12'>id</Th>
                        <Th className=' !text-primary-100'>name</Th>
                        <Th className=' !text-primary-100'>category</Th>
                        <Th className=' !text-primary-100'>user name</Th>
                        <Th className=' !text-primary-100'>created at</Th>
                        <Th className=' !text-primary-100'>status</Th>
                        <Th isNumeric className='text-right !text-primary-200'><p className='mb-2 mr-2'>...</p></Th>
                    </Tr>
                </Thead>
                <Tbody className='text-sm'>
                    {
                        listBussiness && listBussiness.map((item, idx) => {
                            const date = new Date(item.createdAt);
                            const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '');
    
                            return (
                                <Tr className='' key={item.id} style={{border:'#000'}}>
                                    <Td className='py-3'>
                                        <div className='flex items-center'>
                                            <img src={process.env.REACT_APP_BASE_URL + '/' + item.cardImages[0].filePath} alt="" className='rounded-full w-[30px] h-[30px]' />
                                            <p className='ml-4'>#{idx + 1}</p>
                                        </div>
                                    </Td>
                                    <Td>
                                        <p className='col-span-2'>{item.name}</p>
                                    </Td>
                                    <Td>
                                        <p>{item.category.name}</p>
                                    </Td>
                                    <Td>
                                        <p>{item.user.displayName}</p>
                                    </Td>
                                    <Td>
                                        <p>{formattedDate}</p>
                                    </Td>
                                    <Td className=''>
                                        <Switch size='sm' colorScheme='orange' isChecked={item.state === 'Running'} onChange={()=>toggleStatus(item._id, item.episodeNumber)}/>
                                    </Td>
                                    <Td>
                                        <div className="buttons flex justify-end items-center">
                                            <button className='mx-1'>
                                                <Link to={`./${item.id}`}>
                                                    <img src={IconShow} alt="" className='w-[17px]'/>
                                                </Link>
                                            </button>
                                            <button className='mx-1'>
                                                <Link to={`./${item.id}/edit`}>
                                                    <img src={IconEdit} alt="" className='w-[17px]'/>
                                                </Link>
                                            </button>
                                            <button className='mx-1' onClick={()=>handleDelete(item._id, item.episodeNumber)}>
                                                <img src={IconBin} alt="" className='w-[17px]'/>
                                            </button>
                                        </div>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default CategoriesTable
