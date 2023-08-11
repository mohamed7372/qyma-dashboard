import React from 'react'

const Card = ({children}) => {
    return (
        <div className='rounded-lg bg-secondary-200 px-4 py-3'>
            {children}
        </div>
    )
}

export default Card