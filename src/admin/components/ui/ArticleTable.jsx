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
import { listArticleActions } from '../../../store/article/list-article-slice';
import { Switch } from '@chakra-ui/react'
import articlesService from '../../../services/articles';

const ArticleTable = ({setAlert, setMsgAlert}) => {
    const listArticle = useSelector(state => state.listArticle.itemsList)
    const statusListArticle = useSelector(state => state.listArticle.status)

    const dispatch = useDispatch();

    const toast = useToast()

    const [msgToast, setMsgToast] = useState('')
    const [typeToast, setTypeToast] = useState('')
    const [titleToast, setTitleToast] = useState('')
    
    // show toast msg 
    useEffect(() => {
        if (msgToast && titleToast && typeToast) {
            toast({
                title: titleToast,
                description: msgToast,
                status: typeToast,
                duration: 5000,
                isClosable: true,
            })
        }

    }, [msgToast, titleToast, typeToast])

    if (!statusListArticle)
        return null;


    const handleDelete = (id, number) => {
        articlesService
            .deleteArticle(id)
            .then(res => {
                articlesService
                .getAll()
                .then((res) => {
                    setTypeToast('success')
                    setTitleToast('Article deleted.')
                    setMsgToast(`We\'ve delete article ${number} for you.`);

                    dispatch(listArticleActions.replaceData(res.articles));    
                    dispatch(listArticleActions.dataLoading());    
                }).catch((err) => {
                    console.log(err);                
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    
    const toggleStatus = (id, number) => {
        articlesService
            .toggleArticle(id)
            .then(res => {
                articlesService
                .getAll()
                .then((res) => {
                    setTypeToast('success') 
                    setTitleToast('Article updated.')
                    setMsgToast(`We\'ve change article ${number} status for you.`);

                    dispatch(listArticleActions.replaceData(res.articles));    
                    dispatch(listArticleActions.dataLoading());    
                }).catch((err) => {
                    console.log(err);                
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    
    return (
        <TableContainer className='w-full'>
            <Table variant='simple' className='w-full'>
                <Thead>
                    <Tr className='text-left uppercase text-xs font-semibold'>
                        <Th className='!text-gray-300 py-3 pl-12'>id</Th>
                        <Th className=' !text-gray-300'>title</Th>
                        <Th className=' !text-gray-300'>topic</Th>
                        <Th className=' !text-gray-300'>read time</Th>
                        <Th className=' !text-gray-300'>created at</Th>
                        <Th className=' !text-gray-300'>status</Th>
                        <Th isNumeric className='text-right !text-gray-300'><p className='mb-2 mr-2'>...</p></Th>
                    </Tr>
                </Thead>
                <Tbody className='text-sm'>
                    {
                        listArticle && listArticle.map(item => {
                            const date = new Date(item.createdAt);
                            const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '');
    
                            return (
                                <Tr className='border-t border-gray-500' key={item._id}>
                                    <Td className='py-3'>
                                        <div className='flex items-center'>
                                            <img src={item.image} alt="" className='rounded-full w-[30px] h-[30px]' />
                                            <p className='ml-4'>#{item.articleNumber}</p>
                                        </div>
                                    </Td>
                                    <Td>
                                        <p className='truncate w-[100px] col-span-2'>{item.title}</p>
                                    </Td>
                                    <Td>
                                        <p>{item.category.title}</p>
                                    </Td>
                                    <Td>
                                        <p>{item.readTime}</p>
                                    </Td>
                                    <Td>
                                        <p>{formattedDate}</p>
                                    </Td>
                                    <Td className=''>
                                        <Switch size='sm' isChecked={ item.isPublished} onChange={()=>toggleStatus(item._id, item.articleNumber)}/>
                                    </Td>
                                    <Td>
                                        <div className="buttons flex justify-end items-center">
                                            <button className='mx-1'>
                                                <Link to={`./${item._id}`}>
                                                    <img src={IconShow} alt="" className='w-[17px]'/>
                                                </Link>
                                            </button>
                                            <button className='mx-1'>
                                                <Link to={`./${item._id}/edit`}>
                                                    <img src={IconEdit} alt="" className='w-[17px]'/>
                                                </Link>
                                            </button>
                                            <button className='mx-1' onClick={()=>handleDelete(item._id, '??')}>
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

export default ArticleTable
