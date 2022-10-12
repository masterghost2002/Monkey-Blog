import './components/Styles/styleSheet.css'
import React, { useEffect } from 'react';
import {Header}  from './components/Header/Header';
import Auth from './components/Login-Signup/Auth';
import ForgetPassword from './components/Responses/ForgetPassword';
import Blogs from './components/Blogs/Blogs';
import AddBlog from './components/Blogs/AddBlog';
import UserBlogs from './components/Blogs/UserBlogs';
import VerifyMail from './components/VerifyMail/VerifyMail';
import Footer from './components/Footer/Footer';
import ViewFull from './components/Blogs/ViewFull';
import {Route, Routes, useNavigate, useLocation} from 'react-router-dom';
import Contact from './components/ContactUs/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './Store';
import NotFound from './components/Responses/NotFound';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    const accessablePath = location.pathname.substring(0, 6);
    // temporary fix --> this piece of code is serious secuirty issue need to fix as soon as possible
    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
      dispatch(authActions.setShowWelcome());
      if(accessablePath !== '/blog/'){
        navigate('/blogs');
      }
    }
    else if(accessablePath !== "/blog/")
      navigate('/');
  }, []);
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  
  return (
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main className='main'>
        <Routes>
          <Route path='/blog/:id' element={<ViewFull/>}></Route>
          <Route path='/forgetpassword' element = {<ForgetPassword/>}></Route>
          {!isLoggedIn ?<Route path='/' element={<Auth/>}></Route>:
          <>
            <Route path='/blogs' element={<Blogs/>}></Route>
            <Route path='/myBlogs' element={<UserBlogs/>}></Route>
            <Route path='/updateblog/:id' element={<AddBlog/>}></Route>
            <Route path='/addBlog' element={<AddBlog></AddBlog>}></Route>
            <Route path='/verify/:id' element={<VerifyMail/>}></Route>
          </>
        }
        <Route path='/notfound' element={<NotFound/>}></Route>
        <Route path='/contactus' element={<Contact/>}></Route>
        </Routes>
      </main>
      <footer>
        <Footer/>
      </footer>
    </React.Fragment>

  );
}

export default App;
