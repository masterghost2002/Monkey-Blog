import './components/Styles/styleSheet.css'
import React, { useEffect } from 'react';
import { Header } from './components/Header/Header';
import Auth from './components/Login-Signup/Auth';
import ForgetPassword from './components/Responses/ForgetPassword';
import Blogs from './components/Blogs/Blogs';
import AddBlog from './components/Blogs/AddBlog';
import UserBlogs from './components/Blogs/UserBlogs';
import VerifyMail from './components/VerifyMail/VerifyMail';
import Footer from './components/Footer/Footer';
import ViewFull from './components/Blogs/ViewFull';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Contact from './components/ContactUs/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './Store';
import NotFound from './components/Responses/NotFound';
import axios from 'axios';

// const baseServerUrl = "http://localhost:5000/";
const baseServerUrl = "https://masterghostblog.herokuapp.com/";
const AUTH_ACCESS_TOKEN = localStorage.getItem("auth_access_token");


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const themeSide = useSelector((state) => state.themeSide);

  // router dom
  const navigate = useNavigate();
  const location = useLocation();



  const accessablePath = location.pathname.substring(0, 6);
  useEffect(() => {
    // authorization
    if (AUTH_ACCESS_TOKEN !== null && accessablePath !== '/blog/') {
      let reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN}` } });
      const verify_access_token = async () => {
        const res = await reqInstance.post(`${baseServerUrl}user/verify_auth`)
          .then(response => response)
          .catch(function (error) {
            if (error.response.status === 404) navigate('/');
          });
        return res;
      }
      verify_access_token().then((response) => {
        if (response.data.user.themeSide === 'dark')
          dispatch(authActions.setThemeSideDark());
        else dispatch(authActions.setThemeSideLight());
        dispatch(authActions.login());
        dispatch(authActions.setShowWelcome()); //set show welcome to false
        navigate('/blogs');
      }).catch(navigate('/'));
    }
    if (accessablePath !== '/blog/' && isLoggedIn === false) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <header className='header'>
        <Header />
      </header>
      <main className={`main main-${themeSide}`}>
        <Routes>
          <Route path='/blog/:id' element={<ViewFull />}></Route>
          <Route path='/forgetpassword' element={<ForgetPassword />}></Route>
          {!isLoggedIn ? <Route path='/' element={<Auth />}></Route> :
            <>
              <Route path='/blogs' element={<Blogs />}></Route>
              <Route path='/myBlogs' element={<UserBlogs />}></Route>
              <Route path='/updateblog/:id' element={<AddBlog />}></Route>
              <Route path='/addBlog' element={<AddBlog></AddBlog>}></Route>
              <Route path='/verify/:id' element={<VerifyMail />}></Route>
            </>
          }
          <Route path='/notfound' element={<NotFound />}></Route>
          <Route path='/contactus' element={<Contact />}></Route>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>

  );
}

export default App;
