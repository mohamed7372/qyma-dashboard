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
import IconUpload from '../../../assets/icons/upload.svg'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FilesUploadTable = ({files, remove, selectedFiles}) => {
    
    if (files.length === 0)
        return null;
    
    function formatFileSize(sizeInBytes) {
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
        let size = sizeInBytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }

    return (
        <TableContainer className='w-full border border-primary-200 p-4 rounded-lg'>
            <Table variant='unstyled' className='w-full'>
                <Thead>
                    <Tr className='text-left uppercase text-xs font-semibold'>
                        <Th>file name</Th>
                        <Th>file size</Th>
                        <Th>file type</Th>
                        <Th className='grid place-content-center'>remove</Th>
                    </Tr>
                </Thead>
                <Tbody className='text-sm'>
                    {files.map((item, idx) => 
                    {
                        return (<Tr className='' key={idx}>
                            <Td className='py-3'>
                                <div className='flex items-center'>
                                    {selectedFiles[idx] && <img src={selectedFiles[idx]} alt="" className='w-6 h-6 rounded-full' />}
                                    <p className='ml-4'>{item.name.replace(/[.][a-zA-Z0-9]+$/, '')}</p>
                                </div>
                            </Td>
                            <Td>
                                <p>{formatFileSize(item.size)}</p>
                            </Td>
                            <Td>
                                <p>Image</p>
                            </Td>
                            <Td className='flex flex-1 mt-1 items-center justify-center'>
                                <button className=''>
                                    <img src={IconBin} alt="" className='w-[17px]' onClick={(e)=> remove(e, item.name)}/>
                                </button>
                            </Td>
                        </Tr>)
                    }
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default FilesUploadTable
