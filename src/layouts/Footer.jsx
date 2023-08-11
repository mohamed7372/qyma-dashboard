import { Link } from 'react-router-dom';
import SubscribeForm from '../components/form/SubscribeForm';
// import SocialMedia from '../components/ui/SocialMedia';

const Footer = ({ type = 0 }) => {

    return (
        <div className='border-t'>
            <div className={`grid grid-cols-1 md:grid-cols-5 gap-x-8 py-8 responsive`}>
                <div className='md:col-span-2 mb-4 md:mb-0'>
                    <h1 className='text-center md:text-left text-2xl font-bold mb-2'>Kool Health </h1>
                    <p className="text-secondary-100 mb-2 md:mb-8 text-xs text-center md:text-left">Lorem ipsum Lorem ipsum dolor sit amet consectetur. sit amet consectetur adipisicing elit. Recusandae provident magnam corrupti ut quasi expedita doloremque impedit quod ipsa asperiores?</p>
                    <SubscribeForm/>
                </div>
                <div className='px-0 md:px-5'>
                    <h4 className="uppercase font-bold mb-2 md:mb-4 text-center md:text-left mt-4 md:mt-0">content</h4>
                    <ul>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">
                            <Link to={'/'}>
                                Home
                            </Link>
                        </li>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">
                            <Link to={'/podcasts'}>
                                Podcasts
                            </Link>
                        </li>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">
                            <Link to={'/podcasts/archives'}>
                                Podcasts Archives
                            </Link>
                        </li>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">
                            <Link to={'/topics'}>
                                Topics
                            </Link>
                        </li>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">
                            <Link to={'/articles'}>
                                Articles
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='px-0 md:px-5'>
                    <h4 className="uppercase font-bold mb-2 md:mb-4 text-center md:text-left mt-4 md:mt-0">Jack</h4>
                    <ul>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">About</li>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">Notes</li>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">Contact</li>
                    </ul>
                </div>
                <div className='px-0 md:px-5'>
                    <h4 className="uppercase font-bold mb-2 md:mb-4 text-center md:text-left mt-4 md:mt-0">connect</h4>
                    <ul>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">apple podcasts</li>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">spotify</li>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">youtube</li>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">pocket casts</li>
                        <li className="hover:text-primary-200 text-secondary-100 mb-4 text-xs text-center md:text-left">google podcasts</li>
                    </ul>
                </div>
            </div>
            <div className='responsive'>
                <hr />
                <p className='text-xs text-center py-4'>Copyright ©2023, All rights reserved.</p>
            </div>
        </div>
    );
}
 
export default Footer;