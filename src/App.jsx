import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Add from './admin/pages/Add';
import Dashboard from './admin/pages/Dashboard';
import Bussiness from './admin/pages/Bussiness';
import BussinessDetail from './admin/pages/BussinessDetail';
import Categories from './admin/pages/Categories';
import AddBussiness from './admin/components/form/AddBussiness';
import AddCategory from './admin/components/form/AddCategory';
import Reviews from './admin/pages/Reviews';
// import Reviews from './admin/pages/Reviews';
// import Users from './admin/pages/Users';
// import AddUser from './admin/components/form/AddUser';
// import SetAds from './admin/components/form/SetAds';

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

            {/* for admin  */}
            <Route path='admin' element={<Dashboard />} />
            <Route path='admin'>
              <Route path='bussiness' element={<Bussiness />} />
              <Route path='bussiness/:id' element={<BussinessDetail />} />
              <Route path='bussiness/add' element={<Add><AddBussiness /></Add>} />

              <Route path='categories' element={<Categories />} />
              <Route path='categories/add' element={<Add><AddCategory /></Add>} />

              <Route path='reviews' element={<Reviews />} />
              
              {/* <Route path='users' element={<Users />} />
              <Route path='users/add' element={<Add><AddUser /></Add>} /> */}
              
              {/* <Route path='ads' element={<Add><SetAds /></Add>} /> */}

            </Route>
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
