import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopBadge from "./components/Navigation/NavigationComponents/TopBadge";
import LogoSplash from "./components/Reponses/LogoSplash";
import NavRouter from "./components/Routes/NavRouter"; //Will route to required path
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navigation/NavBar";
import { AUTH_TOKEN } from "./components/BackendResponses/backendRequest";
import {useDispatch} from 'react-redux';
import {authActions} from './Store'

function VERIFIED_LINKS(link){
  switch(link){
    case '/': return true;
    case '/blogs': return true;
    case '/myblogs': return true;
    case '/addblog': return true;
    case '/updateblog': return true;
    default: return false;
  }
}
function NON_VERIFIED_LINKS(link){
  if(link.slice(0, 6) === '/blog/') return true;
  switch(link){
    case '/aboutus': return true;
    case '/contactus': return true;
    case '/aboutdeveloper': return true;
    case '/404_not_found': return true;
    default: return false;
  }
}
function App() {

  const AUTH_ACCESS_TOKEN = localStorage.getItem("auth_access_token");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const AUTH_ACCESS_TOKEN_MEM = useMemo(()=>AUTH_ACCESS_TOKEN, [AUTH_ACCESS_TOKEN]);
  const path = useMemo(()=>location.pathname, [location.pathname]);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isLogoSplash = useSelector((state) => state.logoSplash);


  const verifyAccessPath = useCallback(async()=>{
    if(AUTH_ACCESS_TOKEN_MEM === null  && path === '/'){
      return;
    }
    dispatch(authActions.setLogoSplash());
    if(NON_VERIFIED_LINKS(path)){ 
      dispatch(authActions.setLogoSplash());
      navigate(path);
      return;
    }

    if(!NON_VERIFIED_LINKS(path) && !VERIFIED_LINKS(path)){
      dispatch(authActions.setLogoSplash());
      navigate('404_NOT_FOUND');
      return;
    }

    const response =  await AUTH_TOKEN();
    if(response.status === 404){
      dispatch(authActions.setLogoSplash());
      navigate('/');
      return;
    }
    
    dispatch(authActions.login([response.data.user._id, response.data.user.name]));
    dispatch(authActions.setLogoSplash());
    if(path === '/'){
      navigate('/blogs');
      return;
    }
    navigate(path);
    return;
  }, [AUTH_ACCESS_TOKEN_MEM, dispatch, navigate, path])

  useEffect(() => {

    // isLoggedIn condition is used to prevent twice checking of token and path
    if(!isLoggedIn)
      verifyAccessPath();
    return;
  }, [verifyAccessPath, isLoggedIn]);


  return (
    <React.Fragment>
      {isLogoSplash ? <LogoSplash /> :
        <>
          <header>
            <TopBadge />
            {isLoggedIn && <NavBar />}
          </header>
          <main >
            <p>{process.env.REACT_APP_BACKEND_URL}</p>
            <NavRouter isLoggedIn={isLoggedIn} />
          </main>
          <footer>
            <Footer />
          </footer>
        </>}
    </React.Fragment>
  );
}

export default App;
