import React from 'react';

import IconClose from '../../assets/icons/close.svg'

const Popup = ({ handleClose, show, children }) => {
    return (
        show
            ?<div className=''>
                <div className={`fixed z-50 w-full h-full bg-black bg-opacity-50 left-0 top-0 flex justify-center items-center`}>
                    <div className='bg-gray-800 rounded-lg w-[420px] px-8 py-8 relative h-fit'>
                        <section className="modal-main">
                            {children}
                            <button onClick={handleClose} className='absolute right-8 top-6 bg-gray-600 rounded-full p-2'>
                                <img src={IconClose} alt="" className='w-[16px]'/>
                            </button>
                        </section>
                    </div>
                </div>
            </div>
            : null
    );
};

export default Popup;