import { useEffect, useRef, useState } from 'react'
import InputCustom from '../../../components/form/InputCustom'
import { Input, Select } from '@chakra-ui/react'
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

const AddPodcast = () => {
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
    const [image, setImage] = useState('https://res.cloudinary.com/dhf83aynm/image/upload/v1690056154/wl7numkaxxlgfg6paigf.jpg')
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
        episodeService
            .getLast()
            .then(res =>
                setNumber(res[0].episodeNumber + 1)
        )
        
        categoriesService
            .getAll()
            .then(res => {
                setCategory(res.categories)
                setTopic(res.categories[0]._id)
            })
        
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

    
    const fileInputImageRef = useRef(null);
    const fileInputAudioRef = useRef(null);

    const [fileImgName, setFileImgName] = useState('')
    const [fileImgSize, setFileImgSize] = useState('')

    const [fileAudioName, setFileAudioName] = useState('')
    const [fileAudioSize, setFileAudioSize] = useState('')
    
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
                setFileImgName(result.info.original_filename)
                setImage(result.info.url)
                setFileImgSize(parseFloat(result.info.bytes / (1024)).toFixed(2));
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

    const handleFileAudioSelect = (event) => {
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dfvttxaji',
            uploadPreset: 'dnkgpvwi',
            sources: ['local', 'url'],
            showAdvancedOptions: true,
            cropping: true,
            multiple: false,
            defaultSource: 'local',
            allowedFormats: ['mp3', 'wav', 'ogg'], // configure allowed formats here
            resourceType: 'video', // display only images
            maxFiles: 1, // allow only one file to be selected
            uploadParams: {
                accept: 'video/*' // accept only image files
            }
        }, (error, result) => {
            if (!error && result && result.event === 'success') {
                console.log('object', result.info);
                setDuration(convertToFormatTime(result.info.duration))
                setFileAudioName(result.info.original_filename)
                setAudio(result.info.url)
                setFileAudioSize(parseFloat(result.info.bytes / (1024*1024)).toFixed(2));
            }
        });

        widgetRef.current = myWidget;
        widgetRef.current.open();
    };

    const remove = (type) => {
        if (type === 'img') {
            setFileImgName('');
            setFileImgSize('');
            setImage('')
            // fileInputImageRef.current.value = null;
        }
        else {
            setFileAudioName('');
            setFileAudioSize('');
            setAudio('')
        }
    }

    const refBtnImg = () => {
        if (fileInputImageRef && fileInputImageRef !== 'undefined') {
            fileInputImageRef.current.onChange();
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

            <h1 className='mt-6 text-center uppercase text-lg mb-10 border-b border-b-gray-400 w-fit mx-auto pb-4 text-gray-400'>{editPage.includes('edit') ? 'Edit a podcast' : 'Add A New podcast'}</h1>
            
            <form action="">
                {/* general information  */}
                <div className='px-4 mt-10'>
                    <Title nbr={1} title={'General Information'} />
                    <div className='grid grid-cols-12 gap-x-4 w-full'>

                        <div className='col-span-2'>
                            <InputCustom title={'Number episode'} type='text' value={'#1'} disabled={true} item={number}/>
                        </div>
                        <div className='col-span-7'>
                            <InputCustom title={'Title'} type='text' placeholder={'enter title'} item={title} setItem={setTitle} />
                        </div>
                        <div className='col-span-3'>
                            {category && <SelectCustom title={'topic'} data={category} item={topic} setItem={setTopic} showAll />}
                        </div>
                    </div>
                </div>

                {/* upload files  */}
                <div className='px-4 mt-10'>
                    <Title nbr={2} title={'Upload Your Files'} />
                    <div className='flex items-center'>
                        <div className='mr-4 border rounded-md bg-gray-700 px-6 py-2 flex items-center justify-center w-fit mb-4 cursor-pointer'
                            // onClick={()=> fileInputImageRef.current.click()}>
                            onClick={handleFileImageSelect}>
                            <img src={IconUpload} alt="" className='w-[20px]'/>
                            <p className='text-sm font-medium ml-4'>Upload image</p>
                        </div>

                        <div className='border rounded-md bg-gray-700 px-6 py-2 flex items-center justify-center w-fit mb-4 cursor-pointer'
                            // onClick={()=> fileInputAudioRef.current.click()}>
                            onClick={handleFileAudioSelect}>
                            <img src={IconUpload} alt="" className='w-[20px]'/>
                            <p className='text-sm font-medium ml-4'>Upload audio</p>
                        </div>
                    </div>

                    <FilesUploadTable fileImgName={fileImgName} fileImgSize={fileImgSize} fileAudioName={fileAudioName} fileAudioSize={fileAudioSize} remove={remove} />
                </div>

                {/* description  */}
                <div className='px-4 mt-10'>
                    <Title nbr={3} title={'Description'} />
                    <div>
                        <textarea name="" id="" placeholder='write something...' value={desecription}
                            cols="30" rows="10" className='w-full rounded-lg border bg-transparent px-4 py-2 outline-none'
                            onChange={(e)=>setDescription(e.target.value)}
                        >
                        </textarea>
                    </div>
                </div>

                {/* explication  */}
                <div className='px-4 mt-10'>
                    <Title nbr={4} title={'Explication'} />
                    <div>
                        <RichTextEditor setValue={setExplication} value={explication} />
                    </div>
                </div>

                {/* add notes  */}
                <div className='px-4 mt-10'>
                    <Title nbr={4} title={'Notes'} />
                    {
                        notes.length > 0 && notes.map((item, idx) =>  
                            <NoteField key={idx} nbr={idx} notes={notes} setNotes={setNotes} />
                        )
                    }
                    <input type="button" value="Add" className='cursor-pointer w-fit bg-white text-gray-700 text-primary-200 font-semibold px-4 py-2 rounded-lg'
                        onClick={() => setNotes([
                            ...notes,
                            {
                                note: '',
                                hour: 0,
                                minute: 0,
                                second: 0
                            }
                        ]
                        )} />

                    
                </div>

                {/* buttons actions  */}
                <div className='flex items-center justify-end w-full'>
                    <div className='w-fit flex justify-end px-4 mt-6 mb-4'>
                        <Link to={'../podcasts'}>
                            <button className='bg-primary-100 rounded-md px-10 py-2 font-semibold text-primary-200 border border-primary-200 bg-white'
                                >Cancel</button>
                        </Link>
                    </div>
                    <div className='w-fit flex justify-end px-4 mt-6 mb-4'>
                        <button className='bg-primary-100 rounded-md px-10 py-2 font-semibold text-white bg-primary-200'
                            onClick={(e) => handleSubmit(e)}>{editPage.includes('edit') ? 'Edit podcast' : 'Add podcast'}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddPodcast

const Title = ({ nbr, title }) => {
    return (
        <div className='flex items-center mt-4 mb-6'>
            <div className='mr-3 w-8 h-8 pb-[1px] rounded-full border border-gray-400 flex justify-center items-center text-gray-200'>
                {nbr}
            </div>
            <h1 className='text-gray-300 font-medium'>{title}</h1>
        </div>
    )
}

const NoteField = ({ nbr, notes, setNotes }) => {
    const handleChangeInput = (value, type) => {
        setNotes(
            notes.map((item, idx) => {
                if (nbr === idx) {
                    switch (type) {
                        case 'note': return { ...item, note: value }
                        case 'hour': return {
                            ...item, hour: value >= 24 ? 23 :
                                (value.length === 1 ? `0${value}` : value)
                        }
                        case 'min': return {
                            ...item, minute: value >= 60 ? 59 :
                                (value.length === 1 ? `0${value}` : value)
                        }
                        case 'sec': return {
                            ...item, second: value >= 60 ? 59 :
                                (value.length === 1 ? `0${value}` : value)
                        }
                    }
                }
                return item;
            })
        )
    }
    
    const handleRemove = () => {
        noteService
            .deleteNote(notes[nbr].id)
            .then(res=> console.log(res))
        if (notes.length === 1)
            setNotes([{ note: '', hour: '00', minute: '00', second: '00' }])        
        else
            setNotes(notes.filter((item, idx) => nbr !== idx))
        

    }

    return (
        <div className='flex items-center mb-4'>
            <div className='grid grid-cols-12 gap-x-4 w-full'>
                <div className='col-span-6'>
                    <InputCustom title={'Note ' + (nbr + 1)} type='text' placeholder={'enter new note'} item={notes[nbr].note} setItem={(val)=>handleChangeInput(val, 'note')} />
                </div>
                <div className='col-span-2'>
                    <InputCustom title={'Hours'} type='number' min={0} max={23} item={ notes[nbr].hour} setItem={(val)=>handleChangeInput(val, 'hour')} />
                </div>
                <div className='col-span-2'>
                    <InputCustom title={'Minutes'} type='number' min={0} max={59} item={ notes[nbr].minute} setItem={(val)=>handleChangeInput(val, 'min')} />
                </div>
                <div className='col-span-2'>
                    <InputCustom title={'Seconds'} type='number' min={0} max={59} item={ notes[nbr].second} setItem={(val)=>handleChangeInput(val, 'sec')} />
                </div>
            </div>   
            <div className='flex items-center justify-end w-[50px] h-full py-3'>
                <img src={IconRemove} alt="" className='w-[20px] cursor-pointer' onClick={()=>handleRemove()}/>
            </div>
        </div>
    )
}