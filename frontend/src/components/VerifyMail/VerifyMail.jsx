import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function VerifyMail() {
    const params = useParams();
    const handleSubmit = ()=>{
        sendRequest().then(console.log("hi"));

    }
    const sendRequest = async()=>{
        const res = await axios.post(`http://localhost:5000/user/signup/verify/${params.id}`).catch(err=>console.log(err));

        const data = await res.data;
        return data;
    }
    return (
        <div className="container-fluid verify_component">
            <div className="row justify-content-center">
                <div className="col-lg-4">
                    <div className="account-card">
                        <form onSubmit={handleSubmit} className="verify-form">
                            <div className="d-flex justify-content-center">
                                <span className='text-dark fw-bolder fs-2 mb-3'>Vefiy Your Email</span>
                            </div>
                            <button className="btn submit_btn w-100px my-2">Verify</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
};
