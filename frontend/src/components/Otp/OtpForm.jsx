import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { notifyError } from '../Toastify/ToastNotifications';
const baseServerUrl = "https://masterghostblog.herokuapp.com/";
// const baseServerUrl = "http://localhost:5000/";
export default function OtpForm(props) {
    const [otp, setOtp] = useState(0);
    const navigate = useNavigate();
    const [verified, setVerfified] = useState({className: ""});
    const handelVerify = () => {
        const email = props.email;
        const strOTP = String(otp);
        sendRequest(email, strOTP);
    }
    const handelOTP = (event) => {
        setVerfified({message: "", className:""});
        setOtp(event.target.value);
    }
    const handleResend = ()=>{
        props.resendOTP('signup');
    }
    const sendRequest = async (email, strOTP) => {
        await axios.post(`${baseServerUrl}user/signup/verifyuser`, {
            email: email,
            Otp: strOTP
        })
        .then((response) =>{
             setVerfified({className:"success"});
             navigate('/redirects');
            })
        .catch((err) => {
            if(err.response.status === 400){
                setVerfified({className:"danger"});
                notifyError("Incorrect OTP");
            }
        });

    }
    return (
        <>
            <div className="input-group mt-2 mb-4">
                <input type="number" id="quantity" className={`form-control p-3 otp-form border-${verified.className}`} placeholder="OTP" aria-label="Recipient's username" aria-describedby="button-addon2" name='OTP' min="1000" max="9999" onChange={handelOTP} />
                <button className="btn btn-resend-otp" type="button" id="button-resend" title="resend-otp" onClick={handleResend}>Resend OTP &nbsp;<i className="bi bi-arrow-clockwise"></i></button>
            </div>
            <div className={`text-${verified.className}`}>
                {verified.message}
            </div>
            <button className="btn btn-verify-otp" type="button" id="button-verify" title="verify-otp" onClick={handelVerify}>Verify and Continue</button>
        </>
    )
}
