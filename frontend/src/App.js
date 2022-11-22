import './components/Styles/styleSheet.css'
import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';

import 'aos/dist/aos.css';
// components
import { Header } from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LogoSplash from './components/Responses/LogoSplash';
import { AUTH_TOKEN } from './components/BackendResponses/backendRequest';

// using lazy to prevent rendering of all the components even if they are not required
const Auth = lazy(() => import('./components/Auth/Auth'));
const ForgetPassword = lazy(() => import('./components/Auth/ForgetPassword'));
const Blogs = lazy(() => import('./components/Blogs/Blogs'));
const ViewFull = lazy(() => import('./components/Blogs/ViewFull'));
const AddUpdateBlog = lazy(()=>import('./components/Blogs/AddUpdateBlog'));
const Contact = lazy(()=>import('./components/ContactUs/Contact'));
const NotFound = lazy(()=>import('./components/Responses/NotFound'));
const Redirects = lazy(()=>import('./components/Responses/Redirects'));


function App() {

  //store
  const dispatch = useDispatch();
  //store related workk
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const themeSide = useSelector((state) => state.themeSide);

  // progress bar and loader state
  const [progress, setProgress] = useState(0);
  const [loader, setLoader] = useState(false);


  //router dom
  const location = useLocation();
  const navigate = useNavigate();
  const accessablePath = location.pathname;

  //after auth functions
  const verify_access_token = useCallback(async () => {
    const AUTH_ACCESS_TOKEN = localStorage.getItem("auth_access_token");

    // if the accesstoken is null and paths are  redirets blog/:someid , /forgotpassword redirect the user to their required path
    if (AUTH_ACCESS_TOKEN === null && (accessablePath === '/redirects' || accessablePath.substring(0, 6) === '/blog/' || accessablePath === '/forgotpassword' || accessablePath === '/contactus')) {
      navigate(accessablePath);
      return;
    };

    // if the user is logedin and try to access auth page or forgotpassword then redirect to /blogs
    if (isLoggedIn && (accessablePath === '/' || accessablePath === '/forgotpassword')) navigate('/blogs');

    // if   // if the accesstoken is null and paths are not redirets blog/:someid , /forgotpassword redirect the user to '/' auth page
    if (AUTH_ACCESS_TOKEN === null) {
      navigate('/');
      return;
    };

    // setLoader true because we are going to fetch the user info now
    setLoader(true);
    const response = await AUTH_TOKEN();
    if (response.status === 404 && accessablePath !== '/redirects' && accessablePath !== '/contactus' && accessablePath.substring(0, 6) !== '/blog/') {
      setLoader(false);
      dispatch(authActions.logout());
      navigate('/');
      return;
    }
    if (response.data.user.themeSide === 'dark')
      dispatch(authActions.setThemeSideDark());
    else dispatch(authActions.setThemeSideLight());
    dispatch(authActions.login([response.data.user._id, response.data.user.name]));
    setLoader(false);
  }, [dispatch, navigate, accessablePath, isLoggedIn]);

  //use Effect
  useEffect(() => {
    // animation on scroll
    AOS.init({
      offset: 150,
      duration: 500,
      easing: 'ease-in-out-quart'
    });
    verify_access_token();
  }, [verify_access_token]);

  return (
    <React.Fragment>
      {
        loader && !isLoggedIn ? <LogoSplash /> :
          <>
            <header className='header'>
              <LoadingBar
                color='#51A5FA'
                progress={progress}
                loaderSpeed='800'
                onLoaderFinished={() => setProgress(0)}
              />
              <Header />
            </header>
            <main className={`main main-${themeSide}`}>
              <Suspense fallback={<LogoSplash/>}>
                <Routes>
                  <Route path='/blog/:id' element={<ViewFull progressHandler={setProgress} />}></Route>
                  <Route path='/forgotpassword' element={<ForgetPassword progressHandler={setProgress} />}></Route>
                  {!isLoggedIn ? <Route path='/' element={<Auth progressHandler={setProgress} />}></Route> :
                    <>
                      <Route path='/blogs' element={<Blogs progressHandler={setProgress} type={"All Blogs"} />}></Route>
                      <Route path='/myBlogs' element={<Blogs progressHandler={setProgress} type={"My Blogs"} />}></Route>
                      <Route path='/updateblog/:id' element={<AddUpdateBlog progressHandler={setProgress} />}></Route>
                      <Route path='/addBlog' element={<AddUpdateBlog progressHandler={setProgress}></AddUpdateBlog>}></Route>
                    </>
                  }
                  <Route path='/notfound' element={<NotFound />}></Route>
                  <Route path='/contactus' element={<Contact />}></Route>
                  <Route path='/redirects' element={<Redirects />}></Route>
                </Routes>
              </Suspense>
              <ToastContainer
                bodyClassName="toastBody"
                theme="dark"
              />
            </main>
            <footer>
              <Footer />
            </footer>
          </>
      }
    </React.Fragment>
  );
}

export default App;
