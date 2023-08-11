import CustomButton from "../form/CustomButton";
import PodcastPlatform from "./PodcastPlatform";

const SliderHome = () => {
    
    return (
        <div className="w-full h-screen bg-gradient-to-tr from-primary-300 to-secondary-200 flex items-center justify-center flex-col">
            <img src={require('../../assets/logo/logo.png')} alt="" className="mb-8"/>
            <h1 className="font-bold capitalize text-3xl md:text-5xl border-l-8 pl-4 mb-4">Kool Health</h1>
            <p className="text-xs text-center font-medium text-primary-200">PROFESSIONALLY CURATED PODCASTS ON LIFE, & GENERAL HEALTH</p>
            <CustomButton name={'intro to kool health'} css={'px-4 py-3 text-md md:text-lg mt-10 mb-16'} href={'#intro'}/>
            <PodcastPlatform css="w-3/5 2xl:w-2/5"/>
        </div>
    );
}

export default SliderHome;





