import React from 'react'

const CustomButton = ({ name, css, href, cssTitle }) => {
    if(href)
        return (
            <a href={href} className={`capitalize flex items-center justify-center bg-primary-200 rounded-full font-bold ${css}`}>
                <p className={`text-gray-200 w-fit ${cssTitle}`}>
                    {name}
                </p>
            </a>
        )
    return (
        <button className={`capitalize flex items-center justify-center bg-primary-200 rounded-full font-bold ${css}`}>
            <p className={`text-gray-200 w-fit ${cssTitle}`}>
                {name}
            </p>
        </button>
    )
}

export default CustomButton