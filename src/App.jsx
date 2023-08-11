import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
// import Home from './pages/Home';
// import Footer from './layouts/Footer';
// import Podcast from './pages/Podcast';
// import Archive from './pages/Archive';
// import PodcastAdmin from './admin/pages/Bussiness';
// import Add from './admin/pages/Add';
// import AddPodcast from './admin/components/form/AddPodcast';
// import PodcastDetail from './pages/PodcastDetail';
import Dashboard from './admin/pages/Dashboard';
// import PodcastAdminDetail from './admin/pages/PodcastAdminDetail';
// import Articles from './pages/Articles';
// import ArticleDetail from './pages/ArticleDetail';
// import ArticleAdmin from './admin/pages/ArticleAdmin';
// import Topics from './pages/Topics';
// import TopicDetail from './pages/TopicDetail';
// import TopicAdmin from './admin/pages/TopicAdmin';
// import TopicAdminDetail from './admin/pages/TopicAdminDetail';
// import AddTopic from './admin/components/form/AddTopic';
// import AddArticle from './admin/components/form/AddArticle';
// import Auth from './pages/Auth';
// import ArticleAdminDetail from './admin/pages/ArticleAdminDetail';
// import Notes from './pages/Notes';
import Bussiness from './admin/pages/Bussiness';
import BussinessDetail from './admin/pages/BussinessDetail';

function App() {

  return (
    <div className='bg-secondary-100'>
      <div className='fixed bg-black w-full text-center z-50'>
        VERSION BETA v1.0.0 - UNDER DEVELOPMENT
      </div>
      <main>
        <Router>
          <Routes>
            {/* for users  */}
            <Route exact path='/' element={<Bussiness />} />
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
              {/* <Route path='podcasts/:id' element={<PodcastAdminDetail />} />
              <Route path='podcasts/add' element={<Add><AddPodcast /></Add>} />
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
