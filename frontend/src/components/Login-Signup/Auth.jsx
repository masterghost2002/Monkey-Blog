import { React,  useReducer} from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import { NavLink, useNavigate } from 'react-router-dom';
import OtpForm from '../Otp/OtpForm';
import { notifyError, notifySuccess, notifyWelcome } from '../Toastify/ToastNotifications';
import { LOGIN_REQUEST, SIGNUP_REQUEST } from '../BackendResponses/backendRequest';
import Spinner from '../../assests/animations/oval.svg';
import { INITIAL_STATE, authReducer } from '../States/AuthStates';
export default function Auth(props) {
    
    const validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // router dom and server
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //props destructure to prevent looping while changing of progress bar
    const progressHandler = props.progressHandler;


    //loader and state.showOTP component states
    const[state, dispatchState] = useReducer(authReducer, INITIAL_STATE);


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
        if (response.status === 200 && state.isSignUp) {

            //set state.showOTP true
            dispatchState({type:"SUCCESS_SIGNUP_OTP"});
            notifySuccess("OTP Sent");
            dispatchState({type:"SIGNUP_OTP", payload: "successs"});
            return;
        }

        // handle failed requests
        //failed request for login
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

        }
    }

    // no submition of login/signup form
    const handleSubmit = (event) => {
        event.preventDefault();
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
                                {!state.isSignUp && <div className="fw-bold mb-4">New Here?
                                    <button className="text-primary fw-bold btn-auth" type='button' onClick={() => dispatchState({type:"SET_TYPE"})}> Create a new account</button>
                                </div>}

                                {state.isSignUp && <div className="fw-bold  mb-4">Already Have a account??
                                    <button className="text-primary  fw-bold btn-auth" type='button' onClick={() =>  dispatchState({type:"SET_TYPE"})}> Sign In</button>
                                </div>}

                                {state.isSignUp && <div className="form-floating mb-3">
                                    <input type="text" disabled = {state.showOTP?true:false} className="form-control" id="floatingInput exampleFormControlInput1" placeholder="John Vick" onChange={handleChange} value={state.name} name='name' />
                                    <label htmlFor="floatingInput">Full Name</label>
                                </div>}
                                {/*  sigin singup state done */}


                                <div className="form-floating mb-4">
                                    <input type="email" disabled = {state.showOTP?true:false} className={`form-control border-${state.validationMessage.EmailClass}`} id="floatingInput exampleFormControlInput1" placeholder="name@example.com" onChange={handleChange} value={state.inputs.email} name='email' />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>

                                {/* handle password */}
                                <div className="input-group mb-4">
                                    <input disabled = {state.showOTP?true:false} type={state.viewPassword ? "text" : "password"} className={`form-control p-3 border-${state.validationMessage.passwordClass} `} id="floatingPassword" placeholder="Password" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleChange} name='password' />
                                    <button className="btn btn-show-password" type="button" id="button-addon2" onClick={() => dispatchState({type:"PASSWORD_VISIBILITY"})} title={state.viewPassword ? "hide-password" : "view-password"}><i className={`bi bi-eye${state.viewPassword ? "-slash-fill" : "-fill"}`}></i></button>
                                </div>
                                {/* handle password done */}

                                {/* otp form */}
                                {state.spinnerState && <>
                                    <div className='d-flex justify-content-center mt-4'>
                                        <img src={Spinner} alt="sdfsd" />
                                    </div>
                                </>}


                                {!state.loader && state.showOTP && state.isSignUp && <OtpForm email={state.email} resendOTP={sendRequest} />}
                                {/* otp form */}
                                {!state.isSignUp && <div className="my-3 text-end">
                                    <NavLink to="/forgotpassword" className="my-4 forget_btn">Forgot Password?</NavLink>
                                </div>}
                                {!state.showOTP && !state.loader && <button className="btn submit_btn  my-2" type='submit' title={state.isSignUp ? "Sign-Up" : "Sign-In"}>{state.isSignUp ? "Sent OTP" : "Sign-In"} &nbsp;{state.isSignUp ? <i className="bi bi-send"></i> : <i className="bi bi-box-arrow-in-right fw-bold"></i>}</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
