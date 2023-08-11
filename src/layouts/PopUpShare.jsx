import React from 'react'

import IconFacebook from '../assets/icons/facebook.svg'
import IconTwitter from '../assets/icons/twitter.svg'
import IconFPintrest from '../assets/icons/pintrest.svg'
import IconMail from '../assets/icons/mail.svg'
import IconLinkedin from '../assets/icons/linkedin.svg'
import IconCopy from '../assets/icons/copy.svg'
import Popup from '../components/ui/PopUp'
import {
    FacebookShareButton,
    HatenaShareCount,
    LinkedinShareButton,
    MailruShareButton,
    OKShareCount,
    PinterestShareButton,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
    TwitterShareButton,
    VKShareCount
} from "react-share";

const PopUpShare = ({ togglePopup, showPopup }) => {
    console.log(showPopup);
    return (
        <Popup handleClose={togglePopup} show={showPopup}>
            <h1 className='font-bold text-xl'>Share</h1>
            <ul className='grid grid-cols-5 gap-x-4 mt-8'>
                <li>
                    {/* <FacebookShareButton url={'https://github.com'} > */}
                    <FacebookShareButton url={window.location.pathname} >
                        <div className='rounded-full bg-gray-600 w-[60px] h-[60px] flex items-center justify-center'>
                            <img src={IconFacebook} alt="" className='w-[20px]'/>
                        </div>
                        <p className=' text-center mt-2 text-xs  font-semibold capitalize'>facebook</p>
                    </FacebookShareButton>
                </li>
                <li>
                    <TwitterShareButton url={window.location.pathname}>
                        <div className='rounded-full bg-gray-600 w-[60px] h-[60px] flex items-center justify-center'>
                            <img src={IconTwitter} alt="" className='w-[20px]'/>
                        </div>
                        <p className='text-center mt-2 text-xs  font-semibold capitalize'>twitter</p>
                    </TwitterShareButton>
                </li>
                <li>
                    <LinkedinShareButton url={window.location.pathname}>
                        <div className='rounded-full bg-gray-600 w-[60px] h-[60px] flex items-center justify-center'>
                            <img src={IconLinkedin} alt="" className='w-[20px]'/>
                        </div>
                        <p className='text-center mt-2 text-xs  font-semibold capitalize'>linkedin</p>
                    </LinkedinShareButton>
                </li>
                <li>
                    <PinterestShareButton url={window.location.pathname}>
                        <div className='rounded-full bg-gray-600 w-[60px] h-[60px] flex items-center justify-center'>
                            <img src={IconFPintrest} alt="" className='w-[20px]'/>
                        </div>
                        <p className='text-center mt-2 text-xs  font-semibold capitalize'>pintrest</p>
                    </PinterestShareButton>
                </li>
                <li>
                    <MailruShareButton url={window.location.pathname}>
                        <div className='rounded-full bg-gray-600 w-[60px] h-[60px] flex items-center justify-center'>
                            <img src={IconMail} alt="" className='w-[20px]'/>
                        </div>
                        <p className='text-center mt-2 text-xs font-semibold capitalize'>mail</p>
                    </MailruShareButton>
                </li>
            </ul>
            <h3 className='font-bold text-lg mt-8'>Page Link</h3>
            <div className='relative mt-4'>
                <input type="url" disabled value={window.location.pathname} className='rounded-lg bg-gray-600 pl-4 pr-16 py-3 w-full'/>
                <img src={IconCopy} alt="" className='w-[20px] absolute right-4 top-1/2 -translate-y-1/2'/>
            </div>
        </Popup>
    )
}

export default PopUpShare