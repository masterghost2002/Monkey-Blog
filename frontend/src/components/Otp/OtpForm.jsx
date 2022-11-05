import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifyError } from '../Toastify/ToastNotifications';
import { SIGNUP_OTP_VERIFY,FORGOT_PASSWORD_OTP_VERIFY } from '../BackendResponses/backendRequest';
import Spinner from '../../assests/animations/oval.svg';
export default function OtpForm(props) {

    //otp state
    const [otp, setOtp] = useState(0);

    // set loader true after otp sent success
    const [loader, setLoader] = useState(false);

    // router dom to navigate after validation (navigate to login screen)
    const navigate = useNavigate();

    // verified 
    const [verified, setVerfified] = useState({ className: "" });

    // invoke the sendrequest function which further call the  BACKEND FUNCTION
    const handelVerify = () => {
        const email = props.email;
        const strOTP = String(otp);
        sendRequest(email, strOTP);
    }

    //store the otp in state
    const handelOTP = (event) => {
        setVerfified({ message: "", className: "" });
        setOtp(event.target.value);
    }

    // handleResend function invoke the parent sendOTP function to resend the OTP
    const handleResend = () => {
        props.requestFor === "ForgotPassword"?props.resendOTP():props.resendOTP('signup');
    }

    // sendRequest funtion will handle the backend realted work
    const sendRequest = async (email, strOTP) => {
        // requestData obj to send backend request
        const requestData = {
            email: email,
            OTP: strOTP
        };
        let response;
        setLoader(true);

        // selection for is user trying to signup or forgot password
        if (props.requestFor === "ForgotPassword")
            response = await FORGOT_PASSWORD_OTP_VERIFY(requestData)
        else response = await SIGNUP_OTP_VERIFY(requestData);
        
        // setting loader false after getting the response
        setLoader(false);
        // status === 200 means the user is verified now
        if(response.status === 200){
            setVerfified({ className: "success" });
            navigate('/redirects');
            return;
        }
        // else show error
        if(response.status !== 200){
            setVerfified({ className: "danger" });
            notifyError("Incorrect OTP");
            return;
        }
    }

    // 
    return (
        <>
            <div className="input-group mt-2 mb-4">
                <input type="number" id="pin" className={`form-control p-3 otp-form border-${verified.className}`} placeholder="OTP" aria-label="Recipient's username" aria-describedby="button-addon2" name='OTP' pattern="^0[1-9]|[1-9]\d$" required maxLength="4" onChange={handelOTP} />
                <button className="btn btn-resend-otp" type="button" id="button-resend" title="resend-otp" onClick={handleResend}>Resend OTP &nbsp;<i className="bi bi-arrow-clockwise"></i></button>
            </div>
            <div className={`text-${verified.className}`}>
                {verified.message}
            </div>
            {loader && <>
                <div className='d-flex justify-content-center mt-4'>
                    <img src={Spinner} alt="sdfsd" />
                </div>
            </>}
            {!loader && <button className="btn btn-verify-otp" type="button" id="button-verify" title="verify-otp" onClick={handelVerify}>Verify and Continue</button>}
        </>
    )
}
