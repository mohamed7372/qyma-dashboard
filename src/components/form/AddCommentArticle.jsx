import React, {useState, useEffect, useRef} from 'react'
import commentService from '../../services/comment'
import articlesService from '../../services/articles'
import { useParams } from 'react-router-dom'
import { articleActions } from '../../store/article/article-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@chakra-ui/react'

const AddCommentArticle = () => {
    const [comment, setComment] = useState('')
    const { id } = useParams()
    const dispatch = useDispatch()

    const toast = useToast()
    const toastRef = useRef(null)

    const [msgToast, setMsgToast] = useState('')
    const [typeToast, setTypeToast] = useState('')
    const [titleToast, setTitleToast] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        commentService
            .addCommentArticle(id, localStorage.getItem('token'), comment)
            .then(res => {
                console.log(res);
                setComment('')
                articlesService
                    .get(id)
                    .then((res) => {
                        setTypeToast('success') 
                        setTitleToast('Comments.')
                        setMsgToast(`We\'ve add a comment for you.`);
                        
                        dispatch(articleActions.replaceData(res.article));
                        dispatch(articleActions.dataLoading());
                    }).catch((err) => {
                        console.log(err);
                    });

            })
            .then(err => console.log(err))
    }

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



    return (
        <form onSubmit={(e)=>handleSubmit(e)} className='flex md:block flex-col justify-end'>
            <textarea name="" id="" cols="30" rows="10" value={comment} onChange={(e)=>setComment(e.target.value)}
                className='w-full bg-gray-800 rounded-lg px-6 py-4 outline-none text-xs md:text-sm' placeholder='add a comment'></textarea>
            <button type='submit' className='font-medium capitalize md:text-lg bg-primary-200 text-white px-8 py-2 rounded-lg mt-2 mb-8'>
                Add
            </button>
        </form>
    )
}

export default AddCommentArticle