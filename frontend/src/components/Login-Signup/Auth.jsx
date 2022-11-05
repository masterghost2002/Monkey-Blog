import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import { NavLink, useNavigate } from 'react-router-dom';
import OtpForm from '../Otp/OtpForm';
import { notifyError, notifySuccess, notifyWelcome } from '../Toastify/ToastNotifications';
import { LOGIN_REQUEST, SIGNUP_REQUEST } from '../BackendResponses/backendRequest';
import Spinner from '../../assests/animations/oval.svg';

export default function Auth(props) {
    
    const validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // router dom and server
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //props destructure to prevent looping while changing of progress bar
    const progressHandler = props.progressHandler;

    // form realted states
    const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
    const [validationMessage, setValidationMessage] = useState({ OtpClass: "", EmailClass: "", passwordClass: "" });
    const [isSignUp, setIsSignUp] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);

    //loader and showOTP componennt state
    const [showOTP, setShowOTP] = useState(false);
    const [loader, setLoader] = useState(false);
    // form handle change
    const handleChange = (event) => {
        setValidationMessage({ email: "", password: "" });
        setInputs((prevSate) => ({
            ...prevSate, // first it will derefernce the prevState and set it then 
            [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
        }));
    };


    // backend functions
    // login-signup
    const sendRequest = async () => {
        let response;
        //  !isSingUP --> login
        if (!isSignUp) {
            progressHandler(27);
            response = await LOGIN_REQUEST(inputs);
        }
        else {
            setLoader(true);
            response = await SIGNUP_REQUEST(inputs);
            setLoader(false);
        }
        // handle sucess request for signup
        if (response.status === 200 && !isSignUp) {
            const data = await response.data;
            const user = await data.user;
            if (user.themeSide === 'dark')
                dispatch(authActions.setThemeSideDark());
            else dispatch(authActions.setThemeSideLight());
            dispatch(authActions.login([user._id, user.name]));
            localStorage.setItem("auth_access_token", data.accessToken);
            notifyWelcome(user.name);
            navigate('/blogs');
            return;
        }

        // handle success request for signup 
        // the otp confirmation will be handle by OTP component by itself
        if (response.status === 200 && isSignUp) {
            setLoader(false);
            setShowOTP(true);
            notifySuccess("OTP Sent");
            setValidationMessage({ OtpClass: "success" });
            return;
        }

        // handle failed requests
        //failed request for login
        if (response.status !== 200 && !isSignUp) {
            progressHandler(100);
            notifyError(response.data.message);
            if (response.status === 404)
                setValidationMessage({ EmailClass: "danger animate__animated animate__shakeX " });
            else if (response.status === 400)
                setValidationMessage({ passwordClass: "danger  animate__animated animate__shakeX " });
        }
        // failed request for signup
        if (response.status !== 200 && isSignUp) {
            notifyError(response.data.message);
            if (response.status === 404 && response.data.message === "Unable to send otp")
                setValidationMessage({ OtpClass: "danger" });
            else if (response.status === 404)
                setValidationMessage({ EmailClass: "danger animate__animated animate__shakeX " });
            else if (response.status === 400)
                setValidationMessage({ passwordClass: "danger  animate__animated animate__shakeX " });
        }
    }

    // no submition of login/signup form
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputs.email.match(validMailRegex)) {
            notifyError("Not a valid Email");
            setValidationMessage({ EmailClass: "danger  animate__animated animate__shakeX " });
            return;
        }
        if (inputs.password.trim().length === 0 || inputs.password.length < 8) {
            notifyError("Password Should be 8 character long");
            setValidationMessage({ passwordClass: "danger  animate__animated animate__shakeX " });
            return;
        }
        if (isSignUp && inputs.name.trim().length === 0) notifyError("Opps you don't have any name?");

        // after performing some basic valid check move to the backend
        sendRequest();
    }

    return (
        <section className='auth_wrapper'>
            <div className="container-fluid login_component mb-4">
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <div className="account-card">
                            <form onSubmit={handleSubmit} className="auth_form">
                                <div className="d-flex heading-container justify-content-center align-items-centers">
                                    <span className='text-center heading'>{!isSignUp ? "Sign-In" : "Sign-Up"}</span>
                                </div>

                                {/* singin singup options */}
                                {!isSignUp && <div className="fw-bold mb-4">New Here?
                                    <button className="text-primary fw-bold btn-auth" type='button' onClick={() => setIsSignUp(true)}> Create a new account</button>
                                </div>}

                                {isSignUp && <div className="fw-bold  mb-4">Already Have a account??
                                    <button className="text-primary  fw-bold btn-auth" type='button' onClick={() => { setIsSignUp(false); setShowOTP(false) }}> Sign In</button>
                                </div>}

                                {isSignUp && <div className="form-floating mb-3">
                                    <input type="text" disabled = {showOTP?true:false} className="form-control" id="floatingInput exampleFormControlInput1" placeholder="John Vick" onChange={handleChange} value={inputs.name} name='name' />
                                    <label htmlFor="floatingInput">Full Name</label>
                                </div>}
                                {/*  sigin singup state done */}


                                <div className="form-floating mb-4">
                                    <input type="email" disabled = {showOTP?true:false} className={`form-control border-${validationMessage.EmailClass}`} id="floatingInput exampleFormControlInput1" placeholder="name@example.com" onChange={handleChange} value={inputs.email} name='email' />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>

                                {/* handle password */}
                                <div className="input-group mb-4">
                                    <input disabled = {showOTP?true:false} type={viewPassword ? "text" : "password"} className={`form-control p-3 border-${validationMessage.passwordClass} `} id="floatingPassword" placeholder="Password" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleChange} name='password' />
                                    <button className="btn btn-show-password" type="button" id="button-addon2" onClick={() => setViewPassword(!viewPassword)} title={viewPassword ? "hide-password" : "view-password"}><i className={`bi bi-eye${viewPassword ? "-slash-fill" : "-fill"}`}></i></button>
                                </div>
                                {/* handle password done */}

                                {/* otp form */}
                                {loader && <>
                                    <div className='d-flex justify-content-center mt-4'>
                                        <img src={Spinner} alt="sdfsd" />
                                    </div>
                                </>}


                                {!loader && showOTP && isSignUp && <OtpForm email={inputs.email} resendOTP={sendRequest} />}
                                {/* otp form */}
                                {!isSignUp && <div className="my-3 text-end">
                                    <NavLink to="/forgotpassword" className="my-4 forget_btn">Forgot Password?</NavLink>
                                </div>}
                                {!showOTP && !loader && <button className="btn submit_btn  my-2" type='submit' title={isSignUp ? "Sign-Up" : "Sign-In"}>{isSignUp ? "Sent OTP" : "Sign-In"} &nbsp;{isSignUp ? <i className="bi bi-send"></i> : <i className="bi bi-box-arrow-in-right fw-bold"></i>}</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
