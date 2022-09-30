import React from 'react'
export default function ForgetPassword() {
  return (
    <div className="container-fluid forget_component">
            <div className="row  justify-content-center ">
                <div className="col-lg-4">
                    <div className="account-card">
                        <form action="" className="forget-form">
                            <div className="d-flex justify-content-center">
                                <span className='text-dark fw-bolder fs-2 mb-3'>Reset Password</span>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <button className="btn submit_btn w-100px my-2">Send Verfication</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}
