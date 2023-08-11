import React from 'react'

const Card = ({ children, bgImg = '', css, pos = 'top-0 left-0' }) => {
    // const Img = require(bgImg);
    // const Img = bgImg && require(`../../assets/img/${bgImg}`);
    const Img = bgImg && bgImg;

    return (
        <div className={`rounded-2xl relative bg-gray-800 overflow-hidden ${css}`}>
            {Img && <img src={Img} alt="" className='w-full brightness-[0.40] h-full object-cover' />}
            <div className={`absolute ${pos} px-6 py-6 w-full`}>
                {children}
            </div>
        </div>
    )
}

export default Card