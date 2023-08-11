import React from 'react'

const CommentBox = () => {
    return (
        <div className='flex border rounded-lg border-gray-500 px-6 py-4 mb-4'>
            <img src={require('../../assets/img/image 5.png')} alt="" className='w-[50px] h-[50px] object-cover rounded-full mr-8' />
            <div>
                <div className='flex items-center mb-4 justify-between'>
                    <h1 className='text-lg font-semibold'>Lorem, ipsum dolor.</h1>
                    <p className='font-light ml-4 text-sm'>on June 5, 2023</p>
                </div>
                <p className='text-primary-50'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores deserunt veniam aut officia quia, assumenda aperiam enim reiciendis, eaque earum libero voluptates fugit rerum laudantium illo voluptas ut, quaerat vero repudiandae nostrum culpa? Ducimus praesentium consequuntur optio iure laudantium inventore quod enim nostrum debitis accusantium mollitia, voluptatibus voluptate, velit magni.</p>
            </div>
        </div>
    )
}

export default CommentBox