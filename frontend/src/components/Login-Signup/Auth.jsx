<<<<<<< HEAD
import { React,  useReducer} from 'react';
=======
import { React, useState } from 'react';
>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import { NavLink, useNavigate } from 'react-router-dom';
import OtpForm from '../Otp/OtpForm';
import { notifyError, notifySuccess, notifyWelcome } from '../Toastify/ToastNotifications';
import { LOGIN_REQUEST, SIGNUP_REQUEST } from '../BackendResponses/backendRequest';
import Spinner from '../../assests/animations/oval.svg';
<<<<<<< HEAD
import { INITIAL_STATE, authReducer } from '../States/AuthStates';
=======

>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168
export default function Auth(props) {
    
    const validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // router dom and server
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //props destructure to prevent looping while changing of progress bar
    const progressHandler = props.progressHandler;

<<<<<<< HEAD

    //loader and state.showOTP component states
    const[state, dispatchState] = useReducer(authReducer, INITIAL_STATE);


=======
    // form realted states
    const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
    const [validationMessage, setValidationMessage] = useState({ OtpClass: "", EmailClass: "", passwordClass: "" });
    const [isSignUp, setIsSignUp] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);

    //loader and showOTP componennt state
    const [showOTP, setShowOTP] = useState(false);
    const [loader, setLoader] = useState(false);
>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168
    // form handle change
    const handleChange = (event) => {
        dispatchState({type:"RESET_VALIDATION"});
        dispatchState({type:"FORM_INPUTS", payload: event});
    };


    // backend functions
    // login-signup
    const sendRequest = async () => {
        let response;
        //  !isSingUP --> login
<<<<<<< HEAD

        //setSpinner true
        dispatchState({type:"SEND_REQUEST"});
        if (!state.isSignUp) {
            progressHandler(27);
            response = await LOGIN_REQUEST(state.inputs);
        }
        else
            response = await SIGNUP_REQUEST(state.inputs);
        dispatchState({type:"SEND_REQUEST_DONE"});
        // handle sucess request for signup
        if (response.status === 200 && !state.isSignUp) {
=======
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
>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168
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
<<<<<<< HEAD
        if (response.status === 200 && state.isSignUp) {

            //set state.showOTP true
            dispatchState({type:"SUCCESS_SIGNUP_OTP"});
            notifySuccess("OTP Sent");
            dispatchState({type:"SIGNUP_OTP", payload: "successs"});
=======
        if (response.status === 200 && isSignUp) {
            setLoader(false);
            setShowOTP(true);
            notifySuccess("OTP Sent");
            setValidationMessage({ OtpClass: "success" });
>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168
            return;
        }

        // handle failed requests
        //failed request for login
<<<<<<< HEAD
        if (response.status !== 200 && !state.isSignUp) {
            progressHandler(100);
            notifyError(response.data.message);
            if (response.status === 404)
                dispatchState({type:"FAILED_AUTH_EMAIL"});
            else if (response.status === 400)
                dispatchState({type: "FAILED_AUTH_PASSWORD"});
        }
        // failed request for signup
        if (response.status !== 200 && state.isSignUp) {
            notifyError(response.data.message);
            if (response.status === 404 && response.data.message === "Unable to send otp")
                dispatchState({type:"SIGNUP_OTP"});
            else if (response.status === 404)
                dispatchState({type:"FAILED_AUTH_EMAIL"});
            else if (response.status === 400)
                dispatchState({type:"FAILED_AUTH_PASSWORD"});

=======
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
>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168
        }
    }

    // no submition of login/signup form
    const handleSubmit = (event) => {
        event.preventDefault();
<<<<<<< HEAD
        if (!state.inputs.email.match(validMailRegex)) {
            notifyError("Not a valid Email");
            dispatchState({type:"FAILED_AUTH_EMAIL"});
            return;
        }
        if (state.inputs.password.trim().length === 0 || state.inputs.password.length < 8) {
            notifyError("Password Should be 8 character long");
            dispatchState({type:"FAILED_AUTH_PASSWORD"});
            return;
        }
        if (state.isSignUp && state.inputs.name.trim().length === 0) notifyError("Opps you don't have any name?");
=======
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
>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168

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
                                    <span className='text-center heading'>{!state.isSignUp ? "Sign-In" : "Sign-Up"}</span>
                                </div>

                                {/* singin singup options */}
<<<<<<< HEAD
                                {!state.isSignUp && <div className="fw-bold mb-4">New Here?
                                    <button className="text-primary fw-bold btn-auth" type='button' onClick={() => dispatchState({type:"SET_TYPE"})}> Create a new account</button>
                                </div>}

                                {state.isSignUp && <div className="fw-bold  mb-4">Already Have a account??
                                    <button className="text-primary  fw-bold btn-auth" type='button' onClick={() =>  dispatchState({type:"SET_TYPE"})}> Sign In</button>
                                </div>}

                                {state.isSignUp && <div className="form-floating mb-3">
                                    <input type="text" disabled = {state.showOTP?true:false} className="form-control" id="floatingInput exampleFormControlInput1" placeholder="John Vick" onChange={handleChange} value={state.name} name='name' />
=======
                                {!isSignUp && <div className="fw-bold mb-4">New Here?
                                    <button className="text-primary fw-bold btn-auth" type='button' onClick={() => setIsSignUp(true)}> Create a new account</button>
                                </div>}

                                {isSignUp && <div className="fw-bold  mb-4">Already Have a account??
                                    <button className="text-primary  fw-bold btn-auth" type='button' onClick={() => { setIsSignUp(false); setShowOTP(false) }}> Sign In</button>
                                </div>}

                                {isSignUp && <div className="form-floating mb-3">
                                    <input type="text" disabled = {showOTP?true:false} className="form-control" id="floatingInput exampleFormControlInput1" placeholder="John Vick" onChange={handleChange} value={inputs.name} name='name' />
>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168
                                    <label htmlFor="floatingInput">Full Name</label>
                                </div>}
                                {/*  sigin singup state done */}


                                <div className="form-floating mb-4">
<<<<<<< HEAD
                                    <input type="email" disabled = {state.showOTP?true:false} className={`form-control border-${state.validationMessage.EmailClass}`} id="floatingInput exampleFormControlInput1" placeholder="name@example.com" onChange={handleChange} value={state.inputs.email} name='email' />
=======
                                    <input type="email" disabled = {showOTP?true:false} className={`form-control border-${validationMessage.EmailClass}`} id="floatingInput exampleFormControlInput1" placeholder="name@example.com" onChange={handleChange} value={inputs.email} name='email' />
>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>

                                {/* handle password */}
                                <div className="input-group mb-4">
<<<<<<< HEAD
                                    <input disabled = {state.showOTP?true:false} type={state.viewPassword ? "text" : "password"} className={`form-control p-3 border-${state.validationMessage.passwordClass} `} id="floatingPassword" placeholder="Password" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleChange} name='password' />
                                    <button className="btn btn-show-password" type="button" id="button-addon2" onClick={() => dispatchState({type:"PASSWORD_VISIBILITY"})} title={state.viewPassword ? "hide-password" : "view-password"}><i className={`bi bi-eye${state.viewPassword ? "-slash-fill" : "-fill"}`}></i></button>
=======
                                    <input disabled = {showOTP?true:false} type={viewPassword ? "text" : "password"} className={`form-control p-3 border-${validationMessage.passwordClass} `} id="floatingPassword" placeholder="Password" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleChange} name='password' />
                                    <button className="btn btn-show-password" type="button" id="button-addon2" onClick={() => setViewPassword(!viewPassword)} title={viewPassword ? "hide-password" : "view-password"}><i className={`bi bi-eye${viewPassword ? "-slash-fill" : "-fill"}`}></i></button>
>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168
                                </div>
                                {/* handle password done */}

                                {/* otp form */}
<<<<<<< HEAD
                                {state.spinnerState && <>
=======
                                {loader && <>
>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168
                                    <div className='d-flex justify-content-center mt-4'>
                                        <img src={Spinner} alt="sdfsd" />
                                    </div>
                                </>}


<<<<<<< HEAD
                                {!state.loader && state.showOTP && state.isSignUp && <OtpForm email={state.email} resendOTP={sendRequest} />}
                                {/* otp form */}
                                {!state.isSignUp && <div className="my-3 text-end">
                                    <NavLink to="/forgotpassword" className="my-4 forget_btn">Forgot Password?</NavLink>
                                </div>}
                                {!state.showOTP && !state.loader && <button className="btn submit_btn  my-2" type='submit' title={state.isSignUp ? "Sign-Up" : "Sign-In"}>{state.isSignUp ? "Sent OTP" : "Sign-In"} &nbsp;{state.isSignUp ? <i className="bi bi-send"></i> : <i className="bi bi-box-arrow-in-right fw-bold"></i>}</button>}
=======
                                {!loader && showOTP && isSignUp && <OtpForm email={inputs.email} resendOTP={sendRequest} />}
                                {/* otp form */}
                                {!isSignUp && <div className="my-3 text-end">
                                    <NavLink to="/forgotpassword" className="my-4 forget_btn">Forgot Password?</NavLink>
                                </div>}
                                {!showOTP && !loader && <button className="btn submit_btn  my-2" type='submit' title={isSignUp ? "Sign-Up" : "Sign-In"}>{isSignUp ? "Sent OTP" : "Sign-In"} &nbsp;{isSignUp ? <i className="bi bi-send"></i> : <i className="bi bi-box-arrow-in-right fw-bold"></i>}</button>}
>>>>>>> 5a07da859af045f33e46f4d0e3a453aaedc55168
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
