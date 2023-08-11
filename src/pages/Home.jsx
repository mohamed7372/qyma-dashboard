import { useEffect } from 'react';
import AboutSection from '../components/ui/AboutSection';
import ArticleSection from '../components/ui/ArticleSection';
import EndorsementsSection from '../components/ui/EndorsementsSection';
import EpisodeSection from '../components/ui/EpisodeSection';
import IntroSection from '../components/ui/IntroSection';
import PodcastSection from '../components/ui/PodcastSection';
import ShapesCustom from '../components/ui/Shapes';
import SliderHome from '../components/ui/SliderHome';
import TopicsSection from '../components/ui/TopicsSection';
import Footer from '../layouts/Footer';
import NavBar from '../layouts/NavBar';
import { useDispatch } from 'react-redux';
import episodeService from '../services/episode';
import { listEpisodeActions } from '../store/bussiness/list-bussiness-slice';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        episodeService
            .getAll()
            .then((res) => {
                dispatch(listEpisodeActions.replaceData(res.episodes.slice(0,4)));    
                dispatch(listEpisodeActions.dataLoading());    
            }).catch((err) => {
                console.log(err);                
            });
    }, [dispatch])

    return (
        <div className='w-full overflow-x-hidden min-h-screen'>
            <nav className=''>
                <NavBar/>
            </nav>

            <main>
                <SliderHome/>            

                <div className='responsive relative'>
                    <PodcastSection />
                    
                    <div className='relative'>
                        <EndorsementsSection/>
                        <div className='absolute top-[20px] left-[60px] z-0'>
                            <ShapesCustom type={'grids'}/>
                        </div>
                    </div>
                    
                    <div className='relative'>
                        <IntroSection/>
                        <div className='absolute -right-[300px] -top-[300px] z-0'>
                            <ShapesCustom type={'circles'}/>
                        </div>
                    </div>
                    
                    <div className='relative'>
                        <EpisodeSection />
                        <div className='absolute -bottom-[30px] -right-[40px] z-0'>
                            <ShapesCustom type={'grids'}/>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <TopicsSection/>
                        <div className='absolute -left-[300px] -top-[300px] z-0'>
                            <ShapesCustom type={'circles'}/>
                        </div>
                    </div>

                    <ArticleSection />
                    
                    <div className="relative">
                        <AboutSection />
                        <div className='absolute -right-[400px] -top-[100px] z-0'>
                            <ShapesCustom type={'circles'}/>
                        </div>
                        <div className='absolute top-[30px] left-[340px] z-0'>
                            <ShapesCustom type={'grids'}/>
                        </div>
                    </div>
                    
                </div>
            </main>

            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default Home;