import { useEffect, useRef, useState } from 'react'
import InputCustom from '../../../components/form/InputCustom'
import { Input, Select, Stack } from '@chakra-ui/react'
import IconUpload from '../../../assets/icons/upload.svg'
import IconRemove from '../../../assets/icons/bin.svg'
import FilesUploadTable from '../ui/FilesUploadTable'
import episodeService from '../../../services/episode'
// import noteService from '../../../services/note'
import SelectCustom from '../../../components/form/SelectCustom'
import { useDispatch } from 'react-redux'
import categoriesService from '../../../services/categories'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import RichTextEditor from '../ui/RichTextEditor'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import Card from '../ui/Card'
import MultipleFilesUploadTable from '../ui/MultipleFilesUploadTable'
import axios from 'axios'
import { displayName } from 'react-quill'

const AddCategory = () => {
    const editPage = window.location.pathname;

    const { id } = useParams();
    
    const [number, setNumber] = useState('')
    const [title, setTitle] = useState('')
    const [titleAR, setTitleAR] = useState('')
    const [titleEN, setTitleEN] = useState('')
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionAR, setDescriptionAR] = useState('')
    const [descriptionEN, setDescriptionEN] = useState('')

    const [category, setCategory] = useState([])
    const navigate = useNavigate()

    // send request to add or edit 
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (editPage.includes('edit')) {
            categoriesService
                .updateCategory(id, title, titleAR, titleEN, description, descriptionAR, descriptionEN, topic, files[0])
                .then(res => {
                    console.log(res);
                })
                .catch(err=> console.log(err))
        }
        else {
            categoriesService
                .addCategory(title, titleAR, titleEN, description, descriptionAR, descriptionEN, topic, files[0])
                .then(res => {
                    console.log(res);
                })
                .catch(err=> console.log(err))
        }
    }

    // get categories and fill fileds depend the id 
    useEffect(() => {
        categoriesService
            .getAll()
            .then(res => {
                setCategory(res.data.data)
                // setTopic(res.categories[0]._id)
            })
        
        if (id) {
            categoriesService
                .get(id)
                .then(res => {
                    setTitle(res)
                    // setTitleAR(res.data.)
                })
        }
    }, [])

    const [files, setFiles] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0]

        if (file) {
            setFiles([file])
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedFiles(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const fileInputImageRef = useRef(null);

    const remove = (e, name) => {
        e.preventDefault()
        setFiles(files.filter(item => item.name !== name))
    }    

    return (
        <div>
            <h1 className='mt-10 text-center uppercase text-lg mb-10 w-fit mx-auto pb-4'>{editPage.includes('edit') ? 'Edit A Category' : 'Add A New Category'}</h1>
            
            <form action="">
                {/* general information  */}
                <div className='px-4 mt-10'>
                    <Card>
                        <Title nbr={1} title={'General Information'} />
                        <div className='grid grid-cols-12 gap-x-4 gap-y-4 w-full'>
                            <div className='col-span-9'>
                                <InputCustom title={'display name'} type='text' placeholder={'enter title'} item={title} setItem={setTitle} />
                            </div>
                            <div className='col-span-3'>
                                {category && <SelectCustom title={'parent category'} data={category} item={topic} setItem={setTopic} showAll />}
                            </div>
                            <div className='col-span-6'>
                                <InputCustom title={'display name AR'} type='text' placeholder={'enter title in arabic'} item={titleAR} setItem={setTitleAR} />
                            </div>
                            <div className='col-span-6'>
                                <InputCustom title={'display name EN'} type='text' placeholder={'enter title in english'} item={titleEN} setItem={setTitleEN} />
                            </div>
                        </div>
                    </Card>
                </div>


                {/* upload files  */}
                <div className='px-4 mt-10'>
                    <Card>
                        <Title nbr={2} title={'Upload Image'} />
                        
                        <MultipleFilesUploadTable files={files} remove={remove} selectedFiles={selectedFiles} />
                        
                        <input ref={fileInputImageRef} type="file" accept={'image/*'} style={{ display: 'none' }} onChange={handleFileChange} />
                    
                        {
                            files.length === 0 &&
                            <div className='flex items-center'>
                                <div className='border border-primary-200 rounded-md px-6 py-2 flex items-center justify-center w-fit mb-4 cursor-pointer'
                                    onClick={()=> fileInputImageRef.current.click()}>
                                    <p className='text-sm font-medium'>add image</p>
                                </div>
                            </div>
                        }
                    </Card>
                </div>

                {/* description  */}
                <div className='px-4 mt-10'>
                    <Card>
                        <Title nbr={3} title={'Description'} />
                        <div>
                            <textarea name="" id="" placeholder='write something in French...' value={description}
                                cols="30" rows="10" className='w-full rounded-lg border border-primary-200 placeholder:text-primary-200 placeholder:text-opacity-50 bg-transparent px-4 py-2 outline-none'
                                onChange={(e)=>setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <div>
                            <textarea name="" id="" placeholder='write something in Arabic...' value={descriptionAR}
                                cols="30" rows="10" className='w-full rounded-lg border border-primary-200 placeholder:text-primary-200 placeholder:text-opacity-50 bg-transparent px-4 py-2 outline-none'
                                onChange={(e)=>setDescriptionAR(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <div>
                            <textarea name="" id="" placeholder='write something in English...' value={descriptionEN}
                                cols="30" rows="10" className='w-full rounded-lg border border-primary-200 placeholder:text-primary-200 placeholder:text-opacity-50 bg-transparent px-4 py-2 outline-none'
                                onChange={(e)=>setDescriptionEN(e.target.value)}
                            >
                            </textarea>
                        </div>
                    </Card>
                </div>

                {/* buttons actions  */}
                <div className='flex items-center justify-end w-full'>
                    <div className='w-fit flex justify-end px-4 mt-6 mb-4'>
                        <Link to={'../categories'}>
                            <button className='rounded-md px-10 py-2 font-semibold text-primary-200 border border-primary-200'
                                >Cancel</button>
                        </Link>
                    </div>
                    {
                        
                        <div className={`w-fit flex justify-end px-4 mt-6 mb-4 ${title && titleAR && titleEN && description && descriptionAR && descriptionEN && files.length !== 0 ? 'opacity-100' : 'opacity-30'}`}>
                            <button className='rounded-md px-10 py-2 font-semibold text-white bg-primary-200'
                                disabled={!title || !titleAR || !titleEN || !description || !descriptionAR || !descriptionEN || files.length === 0}
                                onClick={(e) => handleSubmit(e)}>{editPage.includes('edit') ? 'Edit category' : 'Add category'}</button>
                        </div>
                    }
                </div>
            </form>
        </div>
    )
}

export default AddCategory

const Title = ({ nbr, title }) => {
    return (
        <div className='flex items-center mt-4 mb-6'>
            <div className='mr-3 w-8 h-8 pb-[1px] rounded-full border border-primary-200 flex justify-center items-center '>
                {nbr}
            </div>
            <h1 className='font-medium'>{title}</h1>
        </div>
    )
}
