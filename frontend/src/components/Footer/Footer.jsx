import React from 'react';
import Logo from '../../assests/images/logo.png';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Footer() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const themeSide = useSelector((state)=>state.themeSide);
  return (
    <footer className={`footer footer-${themeSide}`}>
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div className="col-lg-4 d-flex justify-content-lg-start justify-content-center  mb-2">
            <NavLink to={isLoggedIn ? "/blogs" : "/"}><img src={Logo} alt="www.google.com" className="fluid logo" /></NavLink><p className="col-md-4 mb-0 text-muted">&nbsp; © 2022</p>
          </div>
          <div className="col-lg-4 d-flex justify-content-lg-center justify-content-center mb-2 align-items-center">
            <ul style={{"listStyle":"none"}}>
              <li><NavLink className={`contact-us-link-${themeSide}`} aria-current="page" to="/contactus">About Monkey-App</NavLink></li>
              <li><NavLink className={`contact-us-link-${themeSide}`} aria-current="page" to="/contactus">Contact US</NavLink></li>
            </ul>
          </div>
          <div className="col-lg-4 d-flex d-flex justify-content-lg-end justify-content-center mb-2">
            <span>Follow on</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
