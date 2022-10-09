import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import Logo from '../../assests/images/logo.png';
import Avatar from '../../assests/images/avatar-lg.png';
// import Dropdown from '../Dropdown/Dropdown'; 
export const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    let userName = localStorage.getItem("userName");
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a href={isLoggedIn?"/blogs":"/"}><img src={Logo} alt="www.google.com" className="fluid logo" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn && <li className="nav-item">
                            <NavLink className={({ isActive }) => (isActive ? "nav-link nav-active" : "nav-link")} aria-current="page" to="/blogs">All Blogs</NavLink>
                        </li>}
                        {isLoggedIn && <li className="nav-item">
                            <NavLink className={({ isActive }) => (isActive ? "nav-link nav-active" : "nav-link")} aria-current="page" to="/myBlogs">My Blogs</NavLink>
                        </li>}
                        {isLoggedIn && <li className="nav-item">
                            <NavLink className={({ isActive }) => (isActive ? "nav-link nav-active" : "nav-link")} aria-current="page" to="/addBlog">Add Blog</NavLink>
                        </li>}

                        {!isLoggedIn && <li className="nav-item">
                            <a className="btn" aria-current="page" href="/contactus">Contact US</a>
                        </li>}
                        {isLoggedIn && <div className="nav-item dropdown">
                    <a className="nav-link active dropdown-toggle fw-bold" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {userName.split(" ")[0]}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <div className="d-flex justify-content-center">
                                <img src={Avatar} alt="fdfd" className="img-fluid profile-image" />
                            </div>
                        </li>
                        <li><span className="dropdown-item user_name">{userName}</span></li>
                        <li><a className="dropdown-item disabled" href="/">Profile Setting</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li className="nav-item">
                            <NavLink onClick={() => dispatch(authActions.logout())} className={({ isActive }) => (isActive ? "nav-link" : "nav-link fw-bolder")} aria-current="page" to="/">Log Out</NavLink>
                        </li>
                    </ul>
                </div>}
                    </ul>
                </div>
                
            </div>
        </nav>
    )
}
