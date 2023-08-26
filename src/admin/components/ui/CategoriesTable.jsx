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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
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
    const listCategories = useSelector(state => state.listCategory.itemsList)
    const statusListCategories = useSelector(state => state.listCategory.status)


    const [categoryDetails, setCategoryDetails] = useState({})

    const dispatch = useDispatch();

    const toast = useToast()

    const [viewModal, setVeiwModal] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [idCat, setIdCat] = useState('')
    const [catName, setCatName] = useState('')

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

    if (!statusListCategories)
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
    
    const handleView = (id) => {
        categoriesService
            .get(id)
            .then(res =>
            {
                setCategoryDetails(res.data)
            }
            )
    }

    const convertToDateFromat = (val) => {
        if (!val) 
            return '-'

        const date = new Date(val);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '');
    
        return formattedDate;
    }


    return (
        <TableContainer className='w-full bg-primary-200 bg-opacity-20 rounded-xl'>
            <Table variant='simple' className='w-full'>
                <Thead>
                    <Tr className='text-left uppercase text-xs font-semibold'>
                        <Th className='!text-primary-100 py-3 pl-12'>id</Th>
                        <Th className=' !text-primary-100'>name</Th>
                        <Th className=' !text-primary-100'>parent id</Th>
                        <Th className=' !text-primary-100'>parent name</Th>
                        <Th className=' !text-primary-100'>created at</Th>
                        <Th className=' !text-primary-100'>status</Th>
                        <Th isNumeric className='text-right !text-primary-200'><p className='mb-2 mr-2'>...</p></Th>
                    </Tr>
                </Thead>
                <Tbody className='text-sm'>
                    {
                        listCategories && listCategories.map((item, idx) => {
                            const date = new Date(item.createdAt);
                            const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '');
    
                            return (
                                <Tr className='' key={item.id} style={{border:'#000'}}>
                                    <Td className='py-3'>
                                        <div className='flex items-center'>
                                            {/* <img src={process.env.REACT_APP_BASE_URL + '/' + item.cardImages[0].filePath} alt="" className='rounded-full w-[30px] h-[30px]' /> */}
                                            <p className='ml-4'>#{item.id}</p>
                                        </div>
                                    </Td>
                                    <Td>
                                        <p className='col-span-2'>{item.name}</p>
                                    </Td>
                                    <Td>
                                        <p>{item.parent ? `#${item.parent}` : '-'}</p>
                                    </Td>
                                    <Td>
                                        <p>{item.parent}</p>
                                    </Td>
                                    <Td>
                                        <p>{formattedDate}</p>
                                    </Td>
                                    <Td className=''>
                                        <Switch size='sm' colorScheme='orange' isChecked={item.state === 'Running'} onChange={()=>toggleStatus(item._id, item.episodeNumber)}/>
                                    </Td>
                                    <Td>
                                        <div className="buttons flex justify-end items-center">
                                            <button className='mx-1' onClick={() => {
                                                setCategoryDetails({})
                                                handleView(item.id)
                                                setVeiwModal(true)
                                                onOpen()
                                            }}>
                                                <img src={IconShow} alt="" className='min-w-[17px]'/>
                                            </button>
                                            <button className='mx-1'>
                                                <Link to={`./${item.id}/edit`}>
                                                    <img src={IconEdit} alt="" className='w-[17px]'/>
                                                </Link>
                                            </button>
                                            <button className='mx-1' onClick={() => {
                                                setIdCat(item.id)
                                                setCatName(item.displayName)
                                                setVeiwModal(false)
                                                onOpen()
                                            }}>
                                                <img src={IconBin} alt="" className='min-w-[17px]'/>
                                            </button>
                                        </div>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={true}>
                <ModalOverlay/>
                    <ModalContent overflow={'hidden'} rounded={'10'}>
                        <ModalHeader className=''>{viewModal ? 'Category Details Information' : 'Delete Category'}</ModalHeader>
                        <ModalCloseButton />
                    <ModalBody>
                        {
                            viewModal
                                ?
                                <div className=''>
                                    <div className='grid grid-cols-5'>
                                        <img className='col-span-5 mx-auto mb-6 rounded-full w-28 h-28 object-cover' src={categoryDetails.image && `${process.env.REACT_APP_BASE_URL}/${categoryDetails.image.filePath}`}/>
                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b border-t'>display name:</h3>
                                        <p className='col-span-3 py-2 border-b border-t'>{categoryDetails.displayName}</p>

                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b'>name:</h3>
                                        <p className='col-span-3 py-2 border-b'>{categoryDetails.name}</p>

                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b'>parent category:</h3>
                                        <p className='col-span-3 py-2 border-b'>{categoryDetails.parent ? categoryDetails.parent : '-'}</p>

                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b'>description:</h3>
                                        <p className='col-span-3 py-2 border-b'>{categoryDetails.description}</p>

                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b'>status:</h3>
                                        <Switch className='col-span-3 mt-1 py-2 border-b' size='sm' colorScheme='orange' isChecked={false} onChange={()=>toggleStatus(categoryDetails.id,categoryDetails.displayName)}/>

                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b'>created at:</h3>
                                        <p className='col-span-3 py-2 border-b'>{convertToDateFromat(categoryDetails.createdAt)}</p>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <button
                                            onClick={onClose}
                                            className='mt-6 p-3 border border-primary-200 rounded-lg w-[45%] text-sm text-primary-200'>
                                            Delete
                                        </button>
                                        <button
                                        onClick={() => {
                                            setIdCat(categoryDetails.id)
                                            setCatName(categoryDetails.displayName)
                                            setVeiwModal(false)
                                            onOpen()
                                        }
                                        }
                                            className='mt-6 p-3 bg-primary-200 rounded-lg w-[45%] text-sm text-white'>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                                :
                                <>
                                    <h1 className='text-sm font-semibold'>Are you sure ? to delete category <span className='font-bold uppercase'>{catName}</span></h1>
                                    <div className='flex items-center justify-between'>
                                        <button
                                            onClick={onClose}
                                            className='mt-6 p-3 bg-primary-200 rounded-lg w-[45%] text-sm text-white'>
                                            Cancel
                                        </button>
                                        <button
                                        onClick={() => {
                                            handleDelete(idCat, catName)
                                            setIdCat('')
                                            setCatName('')
                                        }
                                        }
                                            className='mt-6 p-3 bg-primary-200 rounded-lg w-[45%] text-sm text-white'>
                                            Confirm
                                        </button>
                                    </div>
                                </>
                        }
                        </ModalBody>
                    </ModalContent>
            </Modal>
        </TableContainer>
    )
}

export default CategoriesTable
