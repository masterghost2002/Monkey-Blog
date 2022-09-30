import { React, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    ////// server work
    const baseServerUrl = "http://localhost:5000/";
    const [inputs, setInputs] = useState({
        name: "", email: "", password: ""
    });
    const [isSignUp, setIsSignUp] = useState(false);
    // For those who are confused with prevCount
    // Just like when we need to update state using setState, we either passed an object or a function to setState. The function takes prevState and prevProps as parameters. Since setState is async, it is always advisable to update state passing a function rather an object.
    // Likewise setCount takes a function. 
    // Remember useState returns 1. the initial state value 2. a function to update the state
    const handleChange = (event) => {
        setInputs((prevSate) => ({
            ...prevSate, // first it will derefernce the prevState and set it then 
            [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
        }));
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        if (isSignUp)
            sendRequest("signup")
                .then((data)=>localStorage.setItem("userId", data.newUser._id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate('/blogs'));
        else
            sendRequest("login")
                .then((data)=>localStorage.setItem("userId", data.user._id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate('/blogs'))
                .catch((err)=>console.log(err));
    }
    const sendRequest = async (type) => {
        const res = await axios.post(`${baseServerUrl}user/${type}`, {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }).catch(err => console.log(err));
        const data = await res.data
        localStorage.setItem("userName", data.user.name);
        return data;
    }

    return (
        <section className='auth_wrapper'>
            <div className="container-fluid login_component">
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <div className="account-card">
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="d-flex heading-container justify-content-center align-items-centers">
                                    <span className='text-center heading'>{!isSignUp?"Sign-In":"Sign-Up"}</span>
                                </div>

                                {/* singin singup options */}
                                {!isSignUp && <div className="fw-normal text-muted mb-4">New Here?
                                    <button className="text-primary fw-bold btn-auth" onClick={() => setIsSignUp(true)}> Create a new account</button>
                                </div>}

                                {isSignUp && <div className="fw-normal text-muted mb-4">Already Have a account??
                                    <button className="text-primary  fw-bold btn-auth" onClick={() => setIsSignUp(false)}> Sign In</button>
                                </div>}

                                {isSignUp && <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput exampleFormControlInput1" placeholder="John Vick" onChange={handleChange} value={inputs.name} name='name' />
                                    <label htmlFor="floatingInput">Full Name</label>
                                </div>}
                                {/*  sigin singup state done */}


                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput exampleFormControlInput1" placeholder="name@example.com" onChange={handleChange} value={inputs.email} name='email' />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={inputs.password} onChange={handleChange} name='password' />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                {!isSignUp && <div className="forget-password my-3 text-end">
                                    <a href="/forgetpassword" className="my-4 forget_btn">Forget Password?</a>
                                </div>}
                                <button className="btn submit_btn w-100px my-2">{isSignUp ? "Sign-Up" : "Sign-In"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
