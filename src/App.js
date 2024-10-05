import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './components/pages/About';
import Master from './components/layout/Master';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Profile from './components/pages/Profile';
import MasterAdmin from './components/admin/layouts/MasterAdmin';
import AdminHome from './components/admin/AdminHome';
import AddProject from './components/admin/project/AddProject';
import AddTechnology from './components/admin/technology/AddTechnology';
import ManageTechnology from './components/admin/technology/ManageTechnology';
import ManageProject from './components/admin/project/ManageProject';
import ManageEnquiry from './components/admin/enquiry/ManageEnquiry';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import History from './components/pages/History';
import Error from './components/pages/Error';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Master/>}>
            <Route path="/" element={<Home/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path='/history/:status' element={<History/>}/>
          </Route>
          <Route path='/admin' element={<MasterAdmin/>}>
            <Route path="/admin" element={<AdminHome/>} />
            <Route path="/admin/addtechnology" element={<AddTechnology/>} />
            <Route path="/admin/addproject" element={<AddProject/>} />
            <Route path="/admin/managetechnology" element={<ManageTechnology/>} />
            <Route path="/admin/manageproject" element={<ManageProject/>} />
            <Route path="/admin/enquiries" element={<ManageEnquiry/>} />
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Register/>} /> 
          <Route path="/*" element = {<Error/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
