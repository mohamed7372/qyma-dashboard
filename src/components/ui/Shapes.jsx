import React from 'react'

const ShapesCustom = ({ type }) => {
    if(type === 'circles')
        return (
            <div className='border-gray-500 border rounded-full w-[650px] h-[650px] flex justify-center items-center'>
                <div className='border-gray-500 border rounded-full w-[500px] h-[500px] flex justify-center items-center'>
                    <div className='border-gray-500 border rounded-full w-[370px] h-[370px] flex justify-center items-center'>
                        <div className='border-gray-500 border rounded-full w-[230px] h-[230px] flex justify-center items-center'>
                            <div className='border-gray-500 border rounded-full w-[100px] h-[100px] flex justify-center items-center'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    else if(type === 'grids')
        return (
            <div className='grid grid-cols-5 gap-x-4 gap-y-2'>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded-full"></div>
            </div>
        )
}

export default ShapesCustom