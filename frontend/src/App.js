import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopBadge from "./components/Navigation/NavigationComponents/TopBadge";
import LogoSplash from "./components/Reponses/LogoSplash";
import NavRouter from "./components/Routes/NavRouter"; //Will route to required path
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navigation/NavBar";
function returnValidLocation(location) {
  if (location.slice(0, 6) === '/blog/')
    return true;
  switch (location) {
    case '/aboutus':
      return true;
    case '/contactus':
      return true;
    default: return false;
  }
}
// console.log(process.env.REACT_APP_BACKEND_URL);
function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogoSplash = useSelector((state) => state.logoSplash);
  useEffect(() => {
    if (!isLoggedIn && !returnValidLocation(location.pathname))
      navigate('/');
    return;
  }, [navigate, location.pathname, isLoggedIn]);


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
