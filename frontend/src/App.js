import './components/Styles/styleSheet.css'
import React, { useEffect, useState, useCallback } from 'react';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
// components
import { Header } from './components/Header/Header';
import Auth from './components/Login-Signup/Auth';
import ForgetPassword from './components/Responses/ForgetPassword';
import Blogs from './components/Blogs/Blogs';
import AddBlog from './components/Blogs/AddBlog';
import UserBlogs from './components/Blogs/UserBlogs';
import Footer from './components/Footer/Footer';
import ViewFull from './components/Blogs/ViewFull';
import Contact from './components/ContactUs/Contact';
import NotFound from './components/Responses/NotFound';
import Redirects from './components/Responses/Redirects';
// const baseServerUrl = "http://localhost:5000/";
const baseServerUrl = "https://masterghostblog.herokuapp.com/";


function App() {
  //progress bar
  const dispatch = useDispatch();
  const AUTH_ACCESS_TOKEN = localStorage.getItem("auth_access_token");
  const [progress, setProgress] = useState(0);

  //store related workk
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const themeSide = useSelector((state) => state.themeSide);
  //router dom
  const location = useLocation();
  const navigate = useNavigate();
  const accessablePath = location.pathname;
  
  //after auth functions
  

  const verify_access_token = useCallback(async () => {
    if(AUTH_ACCESS_TOKEN === null) return;
    let reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN}` } });
    await reqInstance.post(`${baseServerUrl}user/verify_auth`)
      .then((response) => {
        if (response.data.user.themeSide === 'dark')
          dispatch(authActions.setThemeSideDark());
        else dispatch(authActions.setThemeSideLight());

        dispatch(authActions.login());
        dispatch(authActions.setShowWelcome()); //set show welcome to false
      })
      .catch(function (error) {
        if (error.response.status === 404 && accessablePath !== '/redirects' && accessablePath.substring(0, 6) !== '/blog/') navigate('/');
      });
  }, [AUTH_ACCESS_TOKEN, dispatch, navigate, accessablePath]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: 'ease-in'
    });
    verify_access_token();    
  }, [verify_access_token]);
  
  return (
    <React.Fragment>
      <header className='header'>
        <LoadingBar
          color='#f11946'
          progress={progress}
          loaderSpeed='800'
          onLoaderFinished={() => setProgress(0)}
        />
        <Header />
      </header>
      <main className={`main main-${themeSide}`}>
        <Routes>
          <Route path='/blog/:id' element={<ViewFull progressHandler={setProgress} />}></Route>
          <Route path='/forgetpassword' element={<ForgetPassword />}></Route>
          {!isLoggedIn ? <Route path='/' element={<Auth progressHandler={setProgress} />}></Route> :
            <>
              <Route path='/blogs' element={<Blogs progressHandler={setProgress} />}></Route>
              <Route path='/myBlogs' element={<UserBlogs progressHandler={setProgress} />}></Route>
              <Route path='/updateblog/:id' element={<AddBlog progressHandler={setProgress} />}></Route>
              <Route path='/addBlog' element={<AddBlog progressHandler={setProgress}></AddBlog>}></Route>
            </>
          }
          <Route path='/notfound' element={<NotFound />}></Route>
          <Route path='/contactus' element={<Contact />}></Route>
          <Route path='/redirects' element={<Redirects />}></Route>
        </Routes>
        <ToastContainer
          bodyClassName="toastBody"
          theme="dark"
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>

  );
}

export default App;
