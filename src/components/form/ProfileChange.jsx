import { useEffect, useRef, useState } from 'react'
import InputCustom from '../../components/form/InputCustom'
import categoriesService from '../../services/categories'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const ProfileChange = () => {
    const { id } = useParams();
    
    const toast = useToast()
    const toastRef = useRef(null)
    const toastUpdateRef = useRef(null)
    
    const [username, setUserName] = useState('')
    const [fullname, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [currentpwd, setCurrentPwd] = useState('')
    const [newpwd, setNewPwd] = useState('')
    const [confirmpwd, setConfirmPwd] = useState('')

    const [msgToast, setMsgToast] = useState('')
    const [typeToast, setTypeToast] = useState('')
    const [titleToast, setTitleToast] = useState('')

    // send request to add or edit 
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // categoriesService
        //     .updateGroup(id, title,desecription, topicSelected)
        //     .then(res => {
        //         setNewId(id)
        //         setTypeToast('success') 
        //         setTitleToast('Topic updated.')
        //         setMsgToast(`We\'ve update topic for you.`);
        //     })
        //     .catch(err=> console.log(err))
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
            // setTimeout(() => {
            //     navigate(`../groups/${newId}`)
            // }, 3000);    
        }

    }, [msgToast, titleToast, typeToast])

    // get categories and fill fileds depend the id 
    const userData = useSelector(state => state.user.item)
    const userDataLoading = useSelector(state => state.user.status)

    if (!userDataLoading)
        return null

    return (
        <div>
            <p ref={toastRef}></p>
            
            <form action="">
                {/* general information  */}
                <div className='px-4 mt-10'>
                    <InputCustom title={'fullname'} type='text' placeholder={'enter fullname'} item={fullname ?fullname : userData.name} setItem={setFullName} />
                </div>

                <div className='px-4 mt-10'>
                    <InputCustom title={'UserName'} type='text' placeholder={'enter username'} item={username ? username : userData.username} setItem={setUserName} />
                </div>

                <div className='px-4 mt-10'>
                    <InputCustom title={'email'} type='text' placeholder={'enter email'} item={email ? email : userData.email} setItem={setEmail} />
                </div>

                <div className="md:grid grid-cols-12">
                    <div className='px-4 mt-10 col-span-4'>
                        <InputCustom title={'current password'} type='text' placeholder={'enter current password'} item={currentpwd} setItem={setCurrentPwd} />
                    </div>
                    <div className='px-4 mt-10 col-span-4'>
                        <InputCustom title={'new password'} type='text' placeholder={'enter new password'} item={newpwd} setItem={setNewPwd} />
                    </div>
                    <div className='px-4 mt-10 col-span-4'>
                        <InputCustom title={'confirm password'} type='text' placeholder={'enter confirm password'} item={confirmpwd} setItem={setConfirmPwd} />
                    </div>
                </div>

                {/* buttons actions  */}
                <div className='flex items-center justify-between md:justify-end w-full'>
                    <div className='w-fit flex justify-end px-4 mt-6 mb-4'>
                        <Link to={'../topics'}>
                            <button className='rounded-md px-10 py-3 md:py-2 font-semibold text-primary-200 border border-primary-200 bg-white text-xs md:text-base'
                                >Cancel</button>
                        </Link>
                    </div>
                    <div className='w-fit flex justify-end px-4 mt-6 mb-4'>
                        <button className='bg-primary-100 rounded-md px-10 py-3 md:py-2 font-semibold text-white bg-primary-200 text-xs md:text-base'
                            onClick={(e) => handleSubmit(e)}>{'Save changes'}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfileChange
