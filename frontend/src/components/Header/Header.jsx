import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../Store';

//customs
import { UPDATE_THEME } from '../BackendResponses/backendRequest';
import { notifyError } from '../Toastify/ToastNotifications';
import Logo from '../../assests/images/logo.png';
import Avatar from '../../assests/images/avatar-lg.png';

export const Header = () => {

    // navbar related state
    const [isCollapsed, setIsCollapsed] = useState(true);

    // store
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn); // user is loged in or not?
    const themeSide = useSelector((state) => state.themeSide); //dark of light theme side
    const userInfo = useSelector((state)=>state.userInfo); // return useName, userId

    // handle theme side
    const handleThemeSide = async () => {
        const requestData = {
            userId : userInfo.userId,
            themeSide: themeSide === 'dark'?'light':'dark', // setting the theme side based on the current present theme
        }
        const response = await UPDATE_THEME(requestData);

        // if the response status is 200 it means we successfully updated the theme
        if(response.status === 200){
            themeSide === 'dark'?dispatch(authActions.setThemeSideLight()):dispatch(authActions.setThemeSideDark());
            const auth_access_token =  await response.data.accessToken;
            localStorage.removeItem("auth_access_token");
            localStorage.setItem("auth_access_token", auth_access_token);
            return;
        }
        // else we show the error here using toast
        notifyError(response.message);
    }
    return (
        <nav className={`navbar navbar-expand-lg navbar-${themeSide}`}>
            <div className="container-fluid">
                <NavLink to={isLoggedIn ? "/blogs" : "/"}>
                    {/* <img src={Logo} alt="www.google.com" className="fluid logo" data-bs-target="#navbarNav" data-bs-toggle="collapse" onClick={() => setIsCollapsed(!isCollapsed)} /> */}
                    {!isCollapsed ?
                        <img src={Logo} alt="www.google.com" className="fluid logo" data-bs-target="#navbarNav" data-bs-toggle="collapse" onClick={() => setIsCollapsed(!isCollapsed)} />: <img src={Logo} alt="www.google.com" className="fluid logo"/>}
                </NavLink>
                {/* <span className='fw-bold version_header'>
                    &nbsp; Beta
                </span> */}
                {isLoggedIn && <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? <i className="bi bi-list fw-bold fs-2"></i> : <i className="bi bi-x-lg fs-2"></i>}
                </button>}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn && <li className="nav-item">
                            <button onClick={handleThemeSide} className={`btn theme-side-switch `} title={`switch-to-${themeSide}`} >
                                <i className={`fas fa-${themeSide === 'dark' ? 'sun' : 'moon'}`}></i>
                                {!isCollapsed ? <span className={`theme-side-${themeSide}`} data-bs-target="#navbarNav" data-bs-toggle="collapse" onClick={() => setIsCollapsed(!isCollapsed)}>&nbsp;{themeSide === 'dark' ? "Light Side" : "Dark Side"}</span>
                                    : <span className={`theme-side-${themeSide}`}>&nbsp;{themeSide === 'dark' ? "Light Side" : "Dark Side"}</span>}
                            </button>
                        </li>}
                        {isLoggedIn && <li className="nav-item">
                            <NavLink className={({ isActive }) => (isActive ? `nav-link nav-active-${themeSide}` : "nav-link")} aria-current="page" to="/blogs" >
                                {!isCollapsed ? <span data-bs-target="#navbarNav" data-bs-toggle="collapse" onClick={() => setIsCollapsed(!isCollapsed)}>All Blogs</span> : <span>All Blogs</span>}
                            </NavLink>
                        </li>}
                        {isLoggedIn && <li className="nav-item">
                            <NavLink className={({ isActive }) => (isActive ? `nav-link nav-active-${themeSide}` : "nav-link")} aria-current="page" to="/myBlogs" >
                                {/* <span data-bs-target="#navbarNav" data-bs-toggle="collapse" >My Blogs</span> */}
                                {!isCollapsed ? <span data-bs-target="#navbarNav" data-bs-toggle="collapse" onClick={() => setIsCollapsed(!isCollapsed)}>My Blogs</span> : <span>My Blogs</span>}
                            </NavLink>
                        </li>}
                        {isLoggedIn && <li className="nav-item">
                            <NavLink className={({ isActive }) => (isActive ? `nav-link nav-active-${themeSide}` : "nav-link")} aria-current="page" to="/addBlog" >
                                {/* <span data-bs-target="#navbarNav" data-bs-toggle="collapse" >Add Blog</span> */}
                                {!isCollapsed ?
                                    <span data-bs-target="#navbarNav" data-bs-toggle="collapse" onClick={() => setIsCollapsed(!isCollapsed)}>Add Blog</span> : <span>Add Blogs</span>}
                            </NavLink>
                        </li>}

                        {isLoggedIn && <div className="nav-item dropdown">
                            <a className="nav-link active dropdown-toggle fw-bold" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {userInfo.userName ? userInfo.userName.split(" ")[0] : "Monkey-App"}
                            </a>
                            <ul className={`dropdown-menu ${themeSide === 'dark' ? "dropdown-dark" : ""}`} aria-labelledby="navbarDropdown">
                                <li>
                                    <div className="d-flex justify-content-center">
                                        <img src={Avatar} alt="fdfd" className="img-fluid profile-image" />
                                    </div>
                                </li>
                                <li>
                                    <span className={`dropdown-item user_name_${themeSide}`}>{userInfo.userName}</span>
                                </li>
                                <li>
                                    <a className="dropdown-item disabled" href="/">Profile Setting</a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li className="nav-item">
                                    <NavLink onClick={() => dispatch(authActions.logout())} className={({ isActive }) => (isActive ? "nav-link" : "nav-link fw-bolder")} aria-current="page" to="/">
                                        <span data-bs-target="#navbarNav" data-bs-toggle="collapse" onClick={() => setIsCollapsed(!isCollapsed)}>Log Out</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>}
                    </ul>

                </div>

            </div>
        </nav >
    )
}
