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
import { listBussinessActions } from '../../../store/bussiness/list-bussiness-slice.js'
import ReviewCard2 from '../ui/ReviewCard2'
import reviewService from '../../../services/review';

const ReviewsTable = ({handleDelete}) => {
    const listReviews = useSelector(state => state.listReview.itemsList)
    const statusListReviews = useSelector(state => state.listReview.status)

    const [reviewDetail, setReviewDetail] = useState({})
    const [viewModal, setVeiwModal] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useDispatch();

    const [idComment, setIdComment] = useState('')
    const [userName, setuserName] = useState('')
    const [bussinessName, setBussinessName] = useState('')

    if (!statusListReviews)
        return null;

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
    
    const handleView = (idComment) => {
        setVeiwModal(true)
        onOpen()
        reviewService
            .getReview(idComment)
            .then(
                res => {
                    console.log('#####', res.data);
                    setReviewDetail(res.data)
                }
            )
    }


    return (
        <TableContainer className='w-full bg-primary-200 bg-opacity-20 rounded-xl'>
            <Table variant='simple' className=''>
                <Thead>
                    <Tr className='text-left uppercase text-xs font-semibold'>
                        <Th className='!text-primary-100 py-3 pl-12'>id</Th>
                        <Th className=' !text-primary-100'>username</Th>
                        <Th className=' !text-primary-100'>bussiness</Th>
                        <Th className=' !text-primary-100'>rating</Th>
                        <Th className=' !text-primary-100'>useful</Th>
                        <Th className=' !text-primary-100'>useless</Th>
                        <Th className=' !text-primary-100'>nbr vote</Th>
                        <Th className=' !text-primary-100'>created at</Th>
                        <Th className=' !text-primary-100'>status</Th>
                        <Th isNumeric className='text-right !text-primary-200 !w-[300px]'><p className='mb-2 mr-2'>...</p></Th>
                    </Tr>
                </Thead>
                <Tbody className='text-sm'>
                    {
                        listReviews && listReviews.map((item, idx) => {
                            const date = new Date(item.createdAt);
                            const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '');
    
                            return (
                                <Tr className='' key={item.id} style={{border:'#000'}}>
                                    <Td className='py-3'>
                                        <p>#{item.id}</p>
                                    </Td>
                                    <Td>
                                        <p className='w-[100px] truncate col-span-2'>{item.user.username}</p>
                                    </Td>
                                    <Td>
                                        <p className='w-[100px] truncate'>{item.businessName}</p>
                                    </Td>
                                    <Td>
                                        <p className=''>{item.reviewNote}</p>
                                    </Td>
                                    <Td>
                                        <p className=''>{item.useful}</p>
                                    </Td>
                                    <Td>
                                        <p className=''>0 ??</p>
                                    </Td>
                                    <Td>
                                        <p className=''>{item.userVote}</p>
                                    </Td>
                                    <Td>
                                        <p>{formattedDate}</p>
                                    </Td>
                                    <Td className=''>
                                        <Switch size='sm' colorScheme='orange' isChecked={false} onChange={()=>toggleStatus(item._id, item.episodeNumber)}/>
                                    </Td>
                                    <Td className='!w-[300px]'>
                                        <div className="buttons flex justify-end items-center">
                                            <button className='mx-1' onClick={()=>handleView(item.id)}>
                                                <img src={IconShow} alt="" className='min-w-[17px]'/>
                                            </button>
                                            <button className='mx-1' onClick={() => {
                                                setIdComment(item.id)
                                                setuserName(item.user.username)
                                                setBussinessName(item.businessName)
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
            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={true} size={'5xl'}>
                <ModalOverlay />
                    <ModalContent overflow={'hidden'} rounded={'10'}>
                        <ModalHeader className=''>{viewModal ? 'Details Review' : 'Delete Review'}</ModalHeader>
                        <ModalCloseButton />
                    <ModalBody>
                        {
                            viewModal
                                ?
                                <>
                                    <ReviewCard2 review={reviewDetail} />
                                    <div className='flex items-center justify-end'>
                                        <button
                                            onClick={onClose}
                                            className='p-3 mr-8 border border-primary-200 rounded-lg w-60 text-sm text-primary-200'>
                                            Enable Status
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className='p-3 border border-primary-200 rounded-lg w-60 text-sm text-white bg-primary-200'>
                                            Delete
                                        </button>
                                    </div>
                                </>
                                :
                                <>
                                    <h1 className='text-sm font-semibold'>Are you sure ? to delete review of <span className='font-bold uppercase'>{userName}</span> in bussiness <span className='italic font-bold'>{bussinessName}</span></h1>
                                    <div className='flex items-center justify-between'>
                                        <button
                                            onClick={onClose}
                                            className='mt-6 p-3 bg-primary-200 rounded-lg w-[45%] text-sm text-white'>
                                            Cancel
                                        </button>
                                        <button
                                        onClick={() => {
                                            handleDelete(idComment, userName, bussinessName)
                                            setIdComment('')
                                            setBussinessName('')
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

export default ReviewsTable
