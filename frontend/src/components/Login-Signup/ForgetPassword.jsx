import React, { useState } from 'react';
import OtpForm from '../Otp/OtpForm';
import { notifyError, notifySuccess } from '../Toastify/ToastNotifications';
import { FORGOT_PASSWORD_OTP_REQUEST } from '../BackendResponses/backendRequest';
import Spinner from '../../assests/animations/oval.svg';
const validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function ForgetPassword(props) {
  const [viewPassword, setViewPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "", confirmPassword: "" });
  const [validationMessage, setValidationMessage] = useState({ OtpClass: "", EmailClass: "", passwordClass: "" });
  const [showOTP, setShowOTP] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleChange = (event) => {
    setValidationMessage({ OtpClass: "", passEmailClassword: "", passwordClass: "" });
    setInputs((prevSate) => ({
      ...prevSate, // first it will derefernce the prevState and set it then 
      [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
    }));
  };
  const sendRequest = async () => {
    const requestData = {
      email: inputs.email,
      password: inputs.password
    }

    setLoader(true);
    const response = await FORGOT_PASSWORD_OTP_REQUEST(requestData);
    // console.log(response);
    setLoader(false);
    if (response.status === 200) {
      setShowOTP(true);
      notifySuccess("OTP sent success");
      return;
    }
    if (response.status !== 200) {
      notifyError(response.data.message);
      if (response.status === 404 && response.data.message === "Unable to send otp")
        setValidationMessage({ OtpClass: "danger" });
      else if (response.status === 404)
        setValidationMessage({ EmailClass: "danger animate__animated animate__shakeX " });
      else if (response.status === 400)
        setValidationMessage({ passwordClass: "danger  animate__animated animate__shakeX " });
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.password.length < 8) {
      notifyError("Must be of 8 character");
      return;
    }
    if (inputs.password !== inputs.confirmPassword) {
      notifyError("Password and confrim must be same");
      return;
    }
    if (!inputs.email.match(validMailRegex)) {
      notifyError("Not a valid Email");
      setValidationMessage({ EmailClass: "danger  animate__animated animate__shakeX " });
      return;
    }
    if (inputs.password.trim().length === 0) {
      notifyError("Password Should Not Be Empty")
      setValidationMessage({ passwordClass: "danger  animate__animated animate__shakeX " });
      return;
    }
    sendRequest();
  }

  // no submition of login/signup form

  return (
    <section className='auth_wrapper'>
      <div className="container-fluid login_component mb-4">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="account-card">
              <form onSubmit={handleSubmit} className="auth_form">
                <div className="d-flex heading-container justify-content-center align-items-centers mb-4">
                  <span className='text-center heading'>Forgot Password</span>
                </div>
                <div className="form-floating mb-4">
                  <input disabled={showOTP ? true : false} type="email" className={`form-control border-${validationMessage.EmailClass}`} id="floatingInput exampleFormControlInput1" placeholder="name@example.com" onChange={handleChange} value={inputs.email} name='email' />
                  <label htmlFor="floatingInput">Email address</label>
                </div>

                {/* handle password */}
                <div className="input-group mb-4">
                  <input disabled={showOTP ? true : false} type={viewPassword ? "text" : "password"} className={`form-control p-3 border-${validationMessage.passwordClass} `} id="floatingPassword" placeholder="New Password" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleChange} name='password' />
                  <button className="btn btn-show-password" type="button" id="button-addon2" onClick={() => setViewPassword(!viewPassword)} title={viewPassword ? "hide-password" : "view-password"}><i className={`bi bi-eye${viewPassword ? "-slash-fill" : "-fill"}`}></i></button>
                </div>
                <div className="input-group mb-4">
                  <input disabled={showOTP ? true : false} type="password" className={`form-control p-3 border-${validationMessage.passwordClass} `} id="confirmPassword" placeholder="Confirm Password" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleChange} name='confirmPassword' />
                </div>

                {loader && <>
                  <div className='d-flex justify-content-center mt-4'>
                    <img src={Spinner} alt="sdfsd" />
                  </div>
                </>}
                {/* otp form */}
                {showOTP && <OtpForm email={inputs.email} resendOTP={sendRequest} requestFor={"ForgotPassword"} />}
                {/* otp form */}
                {!showOTP && !loader && <button className="btn submit_btn  my-2" type='submit' title="Send OTP">Send OTP&nbsp;<i className="bi bi-send"></i></button>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
