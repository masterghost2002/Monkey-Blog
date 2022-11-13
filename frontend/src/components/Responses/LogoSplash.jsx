import React from 'react'
import Loader from '../../assests/animations/puff.svg';
export default function LogoSplash() {
    return (
        <section className='logo-splash '>
            <div className="contaier-fluid" >
                <div>
                    <div className='d-flex justify-content-center mt-4'>
                        <span className='fw-bold fs-2'>Monkey-App</span>
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                        <img src={Loader} alt="sdfsd" />
                    </div>
                </div>
            </div>
        </section>
    )
}