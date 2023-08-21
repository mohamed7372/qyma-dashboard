import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Add from './admin/pages/Add';
import Dashboard from './admin/pages/Dashboard';
import Bussiness from './admin/pages/Bussiness';
import BussinessDetail from './admin/pages/BussinessDetail';
import Categories from './admin/pages/Categories';
import AddBussiness from './admin/components/form/AddBussiness';
import AddCategory from './admin/components/form/AddCategory';
import Reviews from './admin/pages/Reviews';

function App() {

  return (
    <div className='bg-secondary-100'>
      <div className='fixed bg-black text-white w-full text-center z-50'>
        VERSION BETA v1.0.0 - UNDER DEVELOPMENT
      </div>
      <main>
        <Router>
          <Routes>
            {/* for users  */}
            <Route exact path='/' element={<Dashboard />} />

            {/* <Route path='login' element={<Auth />} />
            <Route path='register' element={<Auth />} />

            <Route path='podcasts' element={<Podcast />} />
            <Route path='podcasts/archives' element={<Archive />} />
            <Route path='podcasts/archives/:id' element={<PodcastDetail />} />

            <Route path='articles' element={<Articles />} />
            <Route path='articles/:id' element={<ArticleDetail />} />

            <Route path='topics' element={<Topics />} />
            <Route path='topics/:id' element={<TopicDetail />} />

            <Route path='notes' element={<Notes />} /> */}

            {/* for admin  */}
            <Route path='admin' element={<Dashboard />} />
            <Route path='admin'>
              <Route path='bussiness' element={<Bussiness />} />
              <Route path='bussiness/:id' element={<BussinessDetail />} />
              <Route path='bussiness/add' element={<Add><AddBussiness /></Add>} />

              <Route path='categories' element={<Categories />} />
              {/* <Route path='bussiness/:id' element={<BussinessDetail />} /> */}
              <Route path='categories/add' element={<Add><AddCategory /></Add>} />

              <Route path='reviews' element={<Reviews />} />
              
              {/* <Route path='podcasts/:id' element={<PodcastAdminDetail />} />
              <Route path='podcasts/:id/edit' element={<Add><AddPodcast /></Add>} />

              <Route path='articles' element={<ArticleAdmin />} />
              <Route path='articles/:id' element={<ArticleAdminDetail/>} />
              <Route path='articles/add' element={<Add><AddArticle/></Add>} />
              <Route path='articles/:id/edit' element={<Add><AddArticle/></Add>} />

              <Route path='topics' element={<TopicAdmin />} />
              <Route path='topics/:id' element={<TopicAdminDetail />} />
              <Route path='topics/add' element={<Add><AddTopic /></Add>} />
              <Route path='topics/:id/edit' element={<Add><AddTopic /></Add>} /> */}
            </Route>
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
