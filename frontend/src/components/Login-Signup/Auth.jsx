import { React, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import { NavLink, useNavigate } from 'react-router-dom';
import OtpForm from '../Otp/OtpForm';
import { notifyError, notifySuccess } from '../Toastify/ToastNotifications';
// global var should be here like server link etc
const validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const baseServerUrl = "https://masterghostblog.herokuapp.com/";
// const baseServerUrl = "http://localhost:5000/";
export default function Auth(props) {

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
    const [showOTP, setShowOTP] = useState(false);
    // form handle change
    const handleChange = (event) => {
        setValidationMessage({ email: "", password: "" });
        setInputs((prevSate) => ({
            ...prevSate, // first it will derefernce the prevState and set it then 
            [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
        }));
    };


    // backend functions
    // login-sognup
    const sendRequest = async (type) => {
        let url;
        if (type === 'login')
            url = 'login';
        else
            url = 'signup/sendotp';
        const res = await axios.post(`${baseServerUrl}user/${url}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        })
            .then((response) => {
                if (type === 'signup')
                    setShowOTP(true);
                return response;
            })
            .catch(function (error) {
                notifyError(error.response.data.message);
                if (error.response.status === 404 && error.response.data.message === "Unable to send otp")
                    setValidationMessage({ OtpClass: "danger" });
                else if (error.response.status === 404)
                    setValidationMessage({ EmailClass: "danger animate__animated animate__shakeX " });
                else if (error.response.status === 400)
                    setValidationMessage({ passwordClass: "danger  animate__animated animate__shakeX " });
            });
        if (type === 'signup') return res;
        const data = await res.data;
        localStorage.setItem("auth_access_token", data.accessToken);
        return data.user;
    }

    // no submition of login/signup form
    const handleSubmit = (event) => {
        event.preventDefault();
        progressHandler(27);
        if (!inputs.email.match(validMailRegex)) {
            notifyError("Not a valid Email");
            setValidationMessage({EmailClass: "danger  animate__animated animate__shakeX " });
            return;
        }
        if (inputs.password.trim().length === 0) {
            notifyError("Password Should Not Be Empty")
            setValidationMessage({passwordClass: "danger  animate__animated animate__shakeX " });
            return;
        }
        if (isSignUp) {
            if(inputs.name.trim().length === 0)
            {
                notifyError("Opps you don't have any name?");
                return;
            }
            sendRequest("signup")
                .then((response) => {
                    progressHandler(100);
                    if (response.status === 200){
                        notifySuccess("OTP Sent");
                        setValidationMessage({ OtpClass: "success" });
                    }
                    else {
                        notifyError(response.data.message);
                        setValidationMessage({ OtpClass: "danger" });
                    }
                })
                .catch((error) => console.log(error));
        }
        else {
            sendRequest("login")
                .then((user) => {
                    localStorage.setItem("userName", user.name);
                    localStorage.setItem("userId", user._id);
                    if (user.themeSide === 'dark')
                        dispatch(authActions.setThemeSideDark());
                    else dispatch(authActions.setThemeSideLight());
                    dispatch(authActions.login());
                })
                .then(() => navigate('/blogs'))
                .catch((err) => {
                    console.log(err);
                    progressHandler(100);
                });
        }
    }

    // server functions done
    return (
        <section className='auth_wrapper'>
            <div className="container-fluid login_component mb-4">
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <div className="account-card">
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="d-flex heading-container justify-content-center align-items-centers">
                                    <span className='text-center heading'>{!isSignUp ? "Sign-In" : "Sign-Up"}</span>
                                </div>

                                {/* singin singup options */}
                                {!isSignUp && <div className="fw-bold mb-4">New Here?
                                    <button className="text-primary fw-bold btn-auth" type='button' onClick={() => setIsSignUp(true)}> Create a new account</button>
                                </div>}

                                {isSignUp && <div className="fw-bold  mb-4">Already Have a account??
                                    <button className="text-primary  fw-bold btn-auth" type='button' onClick={() =>{ setIsSignUp(false); setShowOTP(false)}}> Sign In</button>
                                </div>}

                                {isSignUp && <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput exampleFormControlInput1" placeholder="John Vick" onChange={handleChange} value={inputs.name} name='name' />
                                    <label htmlFor="floatingInput">Full Name</label>
                                </div>}
                                {/*  sigin singup state done */}


                                <div className="form-floating mb-4">
                                    <input type="email" className={`form-control border-${validationMessage.EmailClass}`} id="floatingInput exampleFormControlInput1" placeholder="name@example.com" onChange={handleChange} value={inputs.email} name='email' />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>

                                {/* handle password */}
                                <div className="input-group mb-4">
                                    <input type={viewPassword ? "text" : "password"} className={`form-control p-3 border-${validationMessage.passwordClass} `} id="floatingPassword" placeholder="Password" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleChange} name='password' />
                                    <button className="btn btn-show-password" type="button" id="button-addon2" onClick={() => setViewPassword(!viewPassword)} title={viewPassword ? "hide-password" : "view-password"}><i className={`bi bi-eye${viewPassword ? "-slash-fill" : "-fill"}`}></i></button>
                                </div>
                                {/* handle password done */}

                                {/* otp form */}
                                {showOTP && isSignUp && <OtpForm email={inputs.email} resendOTP={sendRequest} />}
                                {/* otp form */}
                                {!isSignUp && <div className="my-3 text-end">
                                    <NavLink to="/forgetpassword" className="my-4 forget_btn">Forget Password?</NavLink>
                                </div>}
                                {!showOTP && <button className="btn submit_btn  my-2" type='submit' title={isSignUp ? "Sign-Up" : "Sign-In"}>{isSignUp ? "Sent OTP" : "Sign-In"} &nbsp;{isSignUp?<i className="bi bi-send"></i>:<i className="bi bi-box-arrow-in-right fw-bold"></i>}</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
