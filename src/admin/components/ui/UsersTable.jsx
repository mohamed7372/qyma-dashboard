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
import userService from '../../../services/user';

const UsersTable = ({handleDelete, toggleStatus}) => {
    const listUsers = useSelector(state => state.listUser.itemsList)
    const statusListUsers = useSelector(state => state.listUser.status)

    const [viewModal, setVeiwModal] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useDispatch();

    const [userDetails, setUserDetails] = useState({})

    const [idUser, setIdUser] = useState('')
    const [userName, setuserName] = useState('')

    if (!statusListUsers)
        return null;

    const handleView = (id) => {
        userService
            .getUser(id)
            .then(res =>
            {
                setUserDetails(res.data)
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
                        <Th className=' !text-primary-100'>user name</Th>
                        <Th className=' !text-primary-100'>email</Th>
                        <Th className=' !text-primary-100'>date email verified</Th>
                        <Th className=' !text-primary-100'>type account</Th>
                        <Th className=' !text-primary-100'>created at</Th>
                        <Th className=' !text-primary-100'>status</Th>
                        <Th isNumeric className='text-right !text-primary-200'><p className='mb-2 mr-2'>...</p></Th>
                    </Tr>
                </Thead>
                <Tbody className='text-sm'>
                    {
                        listUsers && listUsers.map((item, idx) => {
                            return (
                                <Tr className='' key={item.id} style={{border:'#000'}}>
                                    <Td className='py-3'>
                                        <div className='flex items-center'>
                                            {/* <img src={process.env.REACT_APP_BASE_URL + '/' + item.cardImages[0].filePath} alt="" className='rounded-full w-[30px] h-[30px]' /> */}
                                            <p className='ml-4'>#{item.id}</p>
                                        </div>
                                    </Td>
                                    <Td>
                                        <p className='col-span-2'>{item.displayName}</p>
                                    </Td>
                                    <Td>
                                        <p>{item.username}</p>
                                    </Td>
                                    <Td>
                                        <p>{item.email}</p>
                                    </Td>
                                    <Td>
                                        <p>{convertToDateFromat(item.emailVerifiedAt)}</p>
                                    </Td>
                                    <Td>
                                        <p>{item.accountType}</p>
                                    </Td>
                                    <Td>
                                        <p>{convertToDateFromat(item.createdAt)}</p>
                                        {/* <p>{item.createdAt}</p> */}
                                    </Td>
                                    <Td className=''>
                                        <Switch size='sm' colorScheme='orange' isChecked={false} onChange={()=>toggleStatus(item.id, item.username, item.status)}/>
                                    </Td>
                                    <Td>
                                        <div className="buttons flex justify-end items-center">
                                            <button className='mx-1' onClick={() => {
                                                setUserDetails({})
                                                handleView(item.id)
                                                setVeiwModal(true)
                                                onOpen()
                                            }}>
                                                <img src={IconShow} alt="" className='min-w-[17px]'/>
                                            </button>
                                            <button className='mx-1'>
                                                <Link to={`./${item.id}/edit`}>
                                                    <img src={IconEdit} alt="" className='min-w-[17px]'/>
                                                </Link>
                                            </button>
                                            <button className='mx-1' onClick={() => {
                                                setIdUser(item.id)
                                                setuserName(item.username)
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
                        <ModalHeader className=''>{viewModal ? 'User Details Information' : 'Delete User'}</ModalHeader>
                        <ModalCloseButton />
                    <ModalBody>
                        {
                            viewModal
                                ?
                                <div className=''>
                                    <div className='grid grid-cols-5'>
                                        <img className='col-span-5 mx-auto mb-6 rounded-full w-28 h-28 object-cover' src={userDetails.image && `${process.env.REACT_APP_BASE_URL}/${userDetails.image.filePath}`}/>
                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b border-t'>name:</h3>
                                        <p className='col-span-3 py-2 border-b border-t'>{userDetails.displayName}</p>
                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b'>username:</h3>
                                        <p className='col-span-3 py-2 border-b'>{userDetails.username}</p>
                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b'>email: <span>{userDetails.emailVerifiedAt ? '(verified)' : ''}</span></h3>
                                        <p className='col-span-3 py-2 border-b'>{userDetails.email}</p>
                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b'>birthday:</h3>
                                        <p className='col-span-3 py-2 border-b'>{convertToDateFromat(userDetails.birthdayDate)}</p>
                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b'>type user:</h3>
                                        <p className='col-span-3 py-2 border-b'>{userDetails.accountType}</p>
                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b'>status:</h3>
                                        <Switch className='col-span-3 mt-1 py-2 border-b' size='sm' colorScheme='orange' isChecked={false} onChange={()=>toggleStatus(userDetails.id,userDetails.username, userDetails.status)}/>
                                        <h3 className='font-semibold capitalize col-span-2 py-2 border-b'>created at:</h3>
                                        <p className='col-span-3 py-2 border-b'>{convertToDateFromat(userDetails.createdAt)}</p>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <button
                                            onClick={() => {
                                            setIdUser(userDetails.id)
                                            setuserName(userDetails.username)
                                            setVeiwModal(false)
                                            onOpen()
                                        }
                                        }
                                            className='mt-6 p-3 border border-primary-200 rounded-lg w-[45%] text-sm text-primary-200'>
                                            Delete
                                        </button>
                                        <Link to={'./edit'} className='w-[45%]'>
                                            <button
                                                className='mt-6 p-3 bg-primary-200 rounded-lg w-full text-sm text-white'>
                                                Edit
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                :
                                <>
                                    <h1 className='text-sm font-semibold'>Are you sure ? to delete username <span className='font-bold uppercase'>{userName}</span></h1>
                                    <div className='flex items-center justify-between'>
                                        <button
                                            onClick={onClose}
                                            className='mt-6 p-3 bg-primary-200 rounded-lg w-[45%] text-sm text-white'>
                                            Cancel
                                        </button>
                                        <button
                                        onClick={() => {
                                            handleDelete(idUser, userName)
                                            setIdUser('')
                                            setuserName('')
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

export default UsersTable
