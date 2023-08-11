import React from 'react'
import Card from './Card'
import QuotesIcon from '../../assets/icons/quotes.svg'

const AboutSection = () => {
    return (
        <div className='section'>
            <h1 className='font-extrabold capitalize text-xl md:text-3xl'>About Us</h1>
            <div className='flex flex-col md:flex-row mt-10'>
                <Card bgImg={''} css={'mt-4 md:mt-0 order-2 md:order-1 md:h-[450px] md:w-[400px]'} />
                <div className='md:w-3/5 md:pl-28 order-1 md:order-2'>
                    <img src={QuotesIcon } alt="" className='w-[40px] md:w-[70px] md:mb-6' />
                    <p className='md:text-2xl text-justify'>
                        Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ipsam? sit, amet consectetur adipisicing elit. Doloremque modi repellendus expedita perspiciatis magni adipisci ex eum quaerat libero provident.
                        <br />
                        Lorem ipsum dolor sit, amet consectetur adipisicing.
                    </p>
                    <p className='capitalize mt-6 font-semibold text-lg'>Lorem, ipsum dolor.</p>
                    <p className='text-primary-200'>Lorem, ipsum.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutSection