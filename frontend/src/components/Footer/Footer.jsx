import React from 'react';
import {NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Instagram from '../../assests/images/instagram.png';
import Github from '../../assests/images/github.png';
import LinkedIn from '../../assests/images/linkedin.png';
export default function Footer() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const themeSide = useSelector((state) => state.themeSide);
  return (
    <footer className={`footer footer-${themeSide}`}>
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div className="col-lg-4 d-flex justify-content-lg-start justify-content-center  mb-2">
            <NavLink to={isLoggedIn ? "/blogs" : "/"} className={`contact-us contact-us-link-${themeSide}`}>Monkey-APP&nbsp; © 2022</NavLink>
          </div>
          <div className="col-lg-4 d-flex justify-content-lg-center justify-content-center mb-2 align-items-center">
            <ul style={{ "listStyle": "none" }}>
              <li><NavLink className={`contact-us contact-us-link-${themeSide}`} aria-current="page" to="/contactus"><i className="fa-regular fa-address-card"></i>&nbsp;About US</NavLink></li>
              <li><NavLink className={`contact-us contact-us-link-${themeSide}`} aria-current="page" to="/contactus"><i className="fa-solid fa-envelope"></i>&nbsp;Contact US</NavLink></li>
            </ul>
          </div>
          <div className="col-lg-4  d-flex justify-content-lg-end justify-content-center mb-2">
            <div className="follow_us text-center">
              <span style = {{color:themeSide==='dark'?'white':'black', fontWeight:'bold'}}>Follow on</span><br />
              <div className="d-flex justify-content-between">
                <a href="https://www.instagram.com/accounts/login/" title='instagram'><img  className = "social-icons" src={Instagram} alt="" /></a>  
                <a href="https://github.com/masterghost2002" title='github'><img  className = "social-icons" src={Github} alt="" /></a>
                <a href="https://www.linkedin.com/in/rakeshdhariwal61/" title='linkedin'><img className = "social-icons" src={LinkedIn} alt="" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
