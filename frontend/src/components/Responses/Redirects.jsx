import React from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../../assests/animations/oval.svg';
export default function Redirects() {
    const navigate = useNavigate();
    setTimeout(()=>navigate('/'), 5000);
    return (
        <section className='redirects'>
            <div className="contaier-fluid" >
                <div>
                    <div className='d-flex justify-content-center'>
                        <i className="bi bi-patch-check-fill"></i>
                    </div>
                    <span className='fw-bold'>Redirecting to Login Page </span>
                    <div className='d-flex justify-content-center mt-4'>
                        <img src={Loader} alt="sdfsd" />
                    </div>
                </div>
            </div>
        </section>
    )
}
