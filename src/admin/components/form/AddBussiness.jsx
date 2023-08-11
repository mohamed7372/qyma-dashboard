import { useEffect, useRef, useState } from 'react'
import InputCustom from '../../../components/form/InputCustom'
import { Input, Select, Stack } from '@chakra-ui/react'
import IconUpload from '../../../assets/icons/upload.svg'
import IconRemove from '../../../assets/icons/bin.svg'
import FilesUploadTable from '../ui/FilesUploadTable'
import HtmlEditor from './HtmlEditor'
import episodeService from '../../../services/episode'
import noteService from '../../../services/note'
import SelectCustom from '../../../components/form/SelectCustom'
import { useDispatch } from 'react-redux'
import categoriesService from '../../../services/categories'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import RichTextEditor from '../ui/RichTextEditor'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import Card from '../ui/Card'

const AddBussiness = () => {
    const editPage = window.location.pathname;

    const { id } = useParams();
    
    const toast = useToast()
    const toastRef = useRef(null)
    const toastUpdateRef = useRef(null)

    const [number, setNumber] = useState('')
    const [title, setTitle] = useState('')
    const [topic, setTopic] = useState('')
    const [desecription, setDescription] = useState('')
    const [explication, setExplication] = useState('')
    const [image, setImage] = useState([])
    const [audio, setAudio] = useState('https://res.cloudinary.com/dhf83aynm/video/upload/v1690056150/kv9x5hfcdfuepnidorei.mp3')
    const [duration, setDuration] = useState('00:00:00')
    const [notes, setNotes] = useState([{
        id: '',
        note: '',
        hour: 0,
        minute: 0,
        second: 0
    }])

    const [category, setCategory] = useState([])
    const [episode, setEpisode] = useState({})

    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    const [newId, setNewId] = useState('')   

    const navigate = useNavigate()

    const [msgToast, setMsgToast] = useState('')
    const [typeToast, setTypeToast] = useState('')
    const [titleToast, setTitleToast] = useState('')

    // send request to add or edit 
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (editPage.includes('edit')) {
            episodeService 
                .updateEpisode(id, title, topic, image, audio, desecription, explication, duration)
                .then(res => {
                    setNewId(id)
                    setTypeToast('success') 
                    setTitleToast('Podcast updated.')
                    setMsgToast(`We\'ve update podcast ${number} for you.`);

                    
                    if (notes.length > 0 && notes[0].id) {
                        notes.map(item => {
                            const date = new Date();
                            date.setHours(parseInt(item.hour));
                            date.setMinutes(parseInt(item.minute));
                            date.setSeconds(parseInt(item.second));
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');
                            const seconds = String(date.getSeconds()).padStart(2, '0');
                            const timeFormat = `${hours}:${minutes}:${seconds}`
                            noteService
                                .updateNote(item.id, item.note, timeFormat) 
                        }
                        )
                    }
                })
                .catch(err=> console.log(err))
        }
        else {
            episodeService 
                .addEpisode(title, topic, image, audio, desecription, explication, duration)
                .then(res => {
                    setNewId(res.episode._id)
                    setTypeToast('success') 
                    setTitleToast('Podcast created.')
                    setMsgToast('We\'ve create your new podcast for you.');
                    
                    if (notes.filter(item => item.note.trim() !== '').length > 0) {
                        notes.filter(item => item.note.trim() !== '')
                            .map(item => {
                                const date = new Date();
                                date.setHours(parseInt(item.hour));
                                date.setMinutes(parseInt(item.minute));
                                date.setSeconds(parseInt(item.second));
                                const hours = String(date.getHours()).padStart(2, '0');
                                const minutes = String(date.getMinutes()).padStart(2, '0');
                                const seconds = String(date.getSeconds()).padStart(2, '0');
                                const timeFormat = `${hours}:${minutes}:${seconds}`
                                
                                noteService
                                    .addNote(res.episode._id, item.note, timeFormat) 
                            }
                        )
                    }
                })
                .catch(err=> console.log(err))
        }
    }

    // get categories and fill fileds depend the id 
    useEffect(() => {
        // episodeService
        //     .getLast()
        //     .then(res =>
        //         setNumber(res[0].episodeNumber + 1)
        // )
        
        // categoriesService
        //     .getAll()
        //     .then(res => {
        //         setCategory(res.categories)
        //         setTopic(res.categories[0]._id)
        //     })
        
        if (id) {
            episodeService
                .get(id)
                .then(res => {
                    setTitle(res.episode.title)
                    setNumber('#' + res.episode.episodeNumber)
                    setDescription(res.episode.description)
                    setExplication(res.episode.explication)
                    setTopic(res.episode.category._id)
                    setImage(res.episode.image)
                    setAudio(res.episode.audio)

                    const valNotes = res.episode.notes.map(item => {
                        const times = item.time.split(':')
                        return { id:item._id, note: item.note, hour: times[0], minute: times[1], second: times[2]}
                        
                    })
                    setNotes(res.episode.notes.length > 0 ? valNotes : [{id:'',note:'',hour:'00',minute:'00',second:'00'}]);
                    // setNotes(res.notes)
                    // setNotes(res.notes && (res.notes.length > 0 ? res.notes : [{note:'',hour:'00',minute:'00',second:'00'}]))
                })
        }
    }, [])

    const [fileImgName, setFileImgName] = useState([])
    const [fileImgSize, setFileImgSize] = useState([])
    
    const handleFileImageSelect = () => {
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dfvttxaji',
            uploadPreset: 'dnkgpvwi',
            sources: ['local', 'url'],
            showAdvancedOptions: true,
            cropping: true,
            multiple: false,
            defaultSource: 'local',
            allowedFormats: ['jpg', 'png', 'jpeg'], // configure allowed formats here
            resourceType: 'image', // display only images
            maxFiles: 1, // allow only one file to be selected
            uploadParams: {
                accept: 'image/*' // accept only image files
            }
        }, (error, result) => {
            if (!error && result && result.event === 'success') {
                console.log(result.info);
                setFileImgName([...fileImgName, result.info.original_filename])
                setImage([...fileImgName, result.info.url])
                setFileImgSize([...fileImgName, parseFloat(result.info.bytes / (1024)).toFixed(2)]);
            }
        });

        widgetRef.current = myWidget;
        widgetRef.current.open();
    };

    const convertToFormatTime = (duration) => {
        let seconds = Math.floor(duration % 60);
        let minutes = Math.floor((duration / 60) % 60);
        let hours = Math.floor((duration / (60 * 60)) % 24);
        
        // Add leading zeros if necessary
        seconds = seconds < 10 ? '10' + seconds : seconds;
        minutes = minutes < 10 ? '10' + minutes : minutes;
        hours = hours < 10 ? '10' + hours : hours;
        
        return hours + ':' + minutes + ':' + seconds;
    }

    const remove = (type) => {
        if (type === 'img') {
            setFileImgName('');
            setFileImgSize('');
            setImage('')
            // fileInputImageRef.current.value = null;
        }
        else {
            // setFileAudioName('');
            // setFileAudioSize('');
            setAudio('')
        }
    }
    
    // show toast msg 
    useEffect(() => {
        if (msgToast && titleToast && typeToast) {
            toast({
                title: titleToast,
                description: msgToast + ' We will redirect you after 3 seconds to detail page',
                status: typeToast,
                duration: 5000,
                isClosable: true,
            })
            if(newId)
                setTimeout(() => {
                    navigate(`../podcasts/${newId}`)
                }, 3000);    
        }

    }, [newId, msgToast, titleToast, typeToast])

    return (
        <div>
            <p ref={toastRef}></p>

            <h1 className='mt-6 text-center uppercase text-lg mb-10 border-b border w-fit mx-auto pb-4'>{editPage.includes('edit') ? 'Edit a ' : 'Add A New '}</h1>
            
            <form action="">
                {/* general information  */}
                <div className='px-4 mt-10'>
                    <Card>
                        <Title nbr={1} title={'General Information'} />
                        <div className='grid grid-cols-12 gap-x-4 w-full'>
                            <div className='col-span-9'>
                                <InputCustom title={'Title'} type='text' placeholder={'enter title'} item={title} setItem={setTitle} />
                            </div>
                            <div className='col-span-3'>
                                {category && <SelectCustom title={'category'} data={category} item={topic} setItem={setTopic} showAll />}
                            </div>
                        </div>

                        {/* address  */}
                        <div className='mt-10'>
                            <Title nbr={4} title={'Address & contact'} />
                            <div className='grid grid-cols-12 gap-x-4 w-full'>
                                <div className='col-span-12 mb-4'>
                                    <InputCustom title={'Address'} type='text' placeholder={'enter title'} item={title} setItem={setTitle} />
                                </div>
                                <div className='col-span-6'>
                                    <InputCustom title={'latitude'} type='text' placeholder={'enter title'} item={title} setItem={setTitle} />
                                </div>
                                <div className='col-span-3'>
                                    <InputCustom title={'longitude'} type='text' placeholder={'enter title'} item={title} setItem={setTitle} />
                                </div>
                                <div className='col-span-3'>
                                    {category && <SelectCustom title={'wilaya'} data={category} item={topic} setItem={setTopic} showAll />}
                                </div>
                                <div className='col-span-6 mt-4'>
                                    <InputCustom title={'phone number'} type='text' placeholder={'enter title'} item={title} setItem={setTitle} />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>


                {/* upload files  */}
                <div className='px-4 mt-10'>
                    <Card>
                        <Title nbr={2} title={'Upload Your Files'} />
                        <div className='flex items-center'>
                            <div className='mr-4 rounded-lg bg-primary-200 px-6 py-3 flex items-center justify-center w-fit mb-4 cursor-pointer'
                                // onClick={()=> fileInputImageRef.current.click()}>
                                onClick={handleFileImageSelect}>
                                <img src={IconUpload} alt="" className='w-[20px]'/>
                                <p className='text-sm font-medium ml-4 text-white'>Upload image</p>
                            </div>
                        </div>

                        <FilesUploadTable fileImgName={fileImgName} fileImgSize={fileImgSize} remove={remove} />
                    </Card>
                </div>

                {/* description  */}
                <div className='px-4 mt-10'>
                    <Card>
                        <Title nbr={3} title={'About the Bussiness'} />
                        <div>
                            <textarea name="" id="" placeholder='write something...' value={desecription}
                                cols="30" rows="10" className='w-full rounded-lg border border-primary-200 placeholder:text-primary-200 placeholder:text-opacity-50 bg-transparent px-4 py-2 outline-none'
                                onChange={(e)=>setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                    </Card>
                </div>

                {/* Amenities and More  */}
                <div className='px-4 mt-10'>
                    <Card>
                        <Title nbr={3} title={'Amenities'} />
                        <div className='ml-1'>
                            <CheckboxGroup colorScheme='orange' defaultValue={['naruto', 'kakashi']}>
                                <Stack spacing={[1, 5]} direction={['column', 'row']} className='!grid !grid-cols-4'>
                                    {[1, 2, 3, 4, 5, 3, 3, 3, 3, 3, 3, 3, 3].map((item, idx) => 
                                        <div className='bg-primary-200 bg-opacity-20 px-4 py-2 rounded-lg flex items-center justify-center' key={idx}>
                                            <Checkbox value='naruto'>
                                                <div className="flex items-center justify-center md:justify-start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                    </svg>
                                                    <p className="ml-3 text-xs sm:text-sm truncate">amenties</p>
                                                </div>
                                            </Checkbox>
                                        </div>
                                    )}
                                </Stack>
                            </CheckboxGroup>
                        </div>
                    </Card>
                </div>

                {/* buttons actions  */}
                <div className='flex items-center justify-end w-full'>
                    <div className='w-fit flex justify-end px-4 mt-6 mb-4'>
                        {/* <Link to={'../podcasts'}> */}
                            <button className='bg-primary-100 rounded-md px-10 py-2 font-semibold text-primary-200 border border-primary-200 bg-white'
                                >Cancel</button>
                        {/* </Link> */}
                    </div>
                    <div className='w-fit flex justify-end px-4 mt-6 mb-4'>
                        <button className='bg-primary-100 rounded-md px-10 py-2 font-semibold text-white bg-primary-200'
                            // onClick={(e) => handleSubmit(e)}>{editPage.includes('edit') ? 'Edit podcast' : 'Add podcast'}</button>
                            onClick={null}>Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddBussiness

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
