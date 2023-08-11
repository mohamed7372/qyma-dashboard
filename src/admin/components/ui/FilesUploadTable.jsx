import React from 'react'
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
} from '@chakra-ui/react'
import Badge from './Badge'
import IconBin from '../../../assets/icons/bin.svg';
import IconFile from '../../../assets/icons/file.svg'
import IconEdit from '../../../assets/icons/edit.svg'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FilesUploadTable = ({fileImgName, fileImgSize, remove}) => {
    
    if (fileImgName.length === 0)
        return null;
    
    return (
        <TableContainer className='w-full border p-4 rounded-lg'>
            <Table variant='unstyled' className='w-full'>
                <Thead>
                    <Tr className='text-left uppercase text-xs font-semibold'>
                        <Th>file name</Th>
                        <Th>file size</Th>
                        <Th>file type</Th>
                        <Th className='!text-center'>remove</Th>
                    </Tr>
                </Thead>
                <Tbody className='text-sm'>
                    {fileImgName.map((item, idx) => 
                        <Tr className=''>
                            <Td className='py-3'>
                                <div className='flex items-center'>
                                    <img src={IconFile} alt="" className='w-[20px]' />
                                    <p className='ml-4'>{item}</p>
                                </div>
                            </Td>
                            <Td>
                                <p>{fileImgSize[idx]} kb</p>
                            </Td>
                            <Td>
                                <p>Image</p>
                            </Td>
                            <Td className='flex justify-center items-center py-3'>
                                <button className='mx-1'>
                                    <img src={IconBin} alt="" className='w-[17px]' onClick={()=> remove('img')}/>
                                </button>
                            </Td>
                        </Tr>
                    )
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default FilesUploadTable
