import React from 'react'

const PodcastItem = () => {
    return (
        <div className='grid grid-cols-5'>
            <div className='flex col-span-2'>
                <h3 className='mr-2 font-semibold text-primary-200'>1</h3>
                <div>
                    <h3 className='font-semibold text-primary-200'>Lorem, ipsum dolor.</h3>
                    <p className='font-light text-sm'>topics</p>
                </div>
            </div>
            <p className='text-sm'>12 min</p>
            <p className='text-sm'>Mohamed</p>
            <div className="buttons flex justify-center">
                <p>show details</p>
                <p>play</p>
            </div>
        </div>
    )
}

export default PodcastItem