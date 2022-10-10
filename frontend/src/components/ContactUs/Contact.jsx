import React from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function Contact() {

    const [inputs, setInputs] = useState({
        name: "", email: "", subject: "", message: ""
    });

    const handleChange = (event) => {
        setInputs((prevSate) => ({
            ...prevSate, // first it will derefernce the prevState and set it then 
            [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
        }));
    };

    //server
    const baseServerUrl = "https://masterghostblog.herokuapp.com/";

    const handleSubmit = (event) => {
        event.preventDefault();
        sendRequest();
    }
    const sendRequest = async (type) => {
        const res = await axios.post(`${baseServerUrl}contactus`, {
            name: inputs.name,
            email: inputs.email,
            subject: inputs.subject,
            message: inputs.message
        }).catch(err => console.log("Mail send failed" + err));
        const status = await res.status;
        return status === 200;
    }
    return (
        <section className='contactus_wrapper'>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <form onSubmit={handleSubmit} className="contactus-form">
                            <div className="d-flex heading-container justify-content-center align-items-centers">
                                <span className='text-center heading'>Contact US</span>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingInput exampleFormControlInput1" placeholder="John Vick" onChange={handleChange} value={inputs.name} name='name' />
                                <label htmlFor="floatingInput">Full Name</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="email" className="form-control" id="floatingInput exampleFormControlInput1" placeholder="name@example.com" onChange={handleChange} value={inputs.email} name='email' />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingInput exampleFormControlInput1" placeholder="forgetmailexample" onChange={handleChange} value={inputs.subject} name='subject' />
                                <label htmlFor="floatingInput">Subject</label>
                            </div>
                            <div className="mb-1">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3" >Message</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" onChange={handleChange} value={inputs.message} name='message'></textarea>
                            </div>
                            <button className="btn submit_btn w-100px my-2">Sent Mail</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}
