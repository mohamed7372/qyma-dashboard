import { Alert, AlertIcon } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AlertCustom = ({alert, setAlert, msgAlert, setMsgAlert, goTo=''}) => {
    const navigate = useNavigate()

    useEffect(() => {
        setAlert(1)
        setMsgAlert('Your new podcast has been added!')
        setTimeout(() => {
            setAlert(0)
            setMsgAlert('')
            goTo && navigate(goTo)
        }, 2000);
    }, [alert])

    return (
        alert ?
            <div className='fixed z-50 shadow-2xl right-8 top-10'>
                <Alert status={alert === 1 ? 'success' : 'error'} className='bg-primary-200 border-l-8 border-l-primary-300 rounded-md py-2 pl-2 pr-4 w-fit'>
                    <AlertIcon className='w-4 mr-3'/>
                    {msgAlert}
                </Alert>
            </div>
            : null
    )
}

export default AlertCustom