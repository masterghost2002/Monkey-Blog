import React, { useReducer } from 'react';
import { notifyError, notifySuccess } from '../Toastify/ToastNotifications';
import { INITIAL_STATE, authReducer } from '../States/AuthStates';
import { FORGOT_PASSWORD_OTP_REQUEST } from '../BackendResponses/backendRequest';

import FormContainer from '../Form/FormContainer';
import FormHeading from '../Form/FormComponents/FormHeading';
import PasswordInput from '../Form/FormComponents/PasswordInput';
import SimpleInput from '../Form/FormComponents/SimpleInput';
import OtpForm from '../Form/FormComponents/OtpForm';
import FormSpinner from '../Form/FormComponents/FormSpinner';
import spinnerStyle from '../../assests/animations/oval.svg';
import Button from '../Modals/Button';

const validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function ForgetPassword() {
  const [state, dispatchState] = useReducer(authReducer, INITIAL_STATE);

  const handleChange = (event) => {
    event.preventDefault();
    dispatchState({ type: "RESET_VALIDATION" });
    dispatchState({ type: "FORM_INPUTS", payload: event });
  };
  const sendRequest = async () => {
    const requestData = {
      email: state.inputs.email,
      password: state.inputs.password
    }

    dispatchState({ type: "SEND_REQUEST" });
    const response = await FORGOT_PASSWORD_OTP_REQUEST(requestData);
    dispatchState({ type: "SEND_REQUEST_DONE" });
    if (response.status === 200) {
      dispatchState({ type: "SUCCESS_SIGNUP_OTP" });
      notifySuccess("OTP sent success");
      return;
    }
    if (response.status !== 200) {
      notifyError(response.data.message);
      if (response.status === 404 && response.data.message === "Unable to send otp")
        dispatchState({ type: "SIGNUP_OTP", payload: "danger" });
      else if (response.status === 404)
        dispatchState({ type: "FAILED_AUTH_EMAIL" });
      else if (response.status === 400)
        dispatchState({ type: "FAILED_AUTH_PASSWORD" });
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.inputs.password.length < 8) {
      notifyError("Must be of 8 character");
      return;
    }
    if (state.inputs.password !== state.inputs.confirmpassword) {
      notifyError("Password and confrim must be same");
      return;
    }
    if (!state.inputs.email.match(validMailRegex)) {
      notifyError("Not a valid Email");
      dispatchState({ type: "FAILED_AUTH_EMAIL" });
      return;
    }
    if (state.inputs.password.trim().length === 0) {
      notifyError("Password Should Not Be Empty")
      dispatchState({ type: "FAILED_AUTH_PASSWORD" });
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
            <FormContainer handleSubmit={handleSubmit}>
              <FormHeading heading={"Forgot Password"} />
              <SimpleInput
                placeholder={"Email Address"}
                onChange={handleChange}
                style={state.validationMessage.EmailClass}
                disabled={state.showOTP}
                value={"Email"}
                name={"email"}
                id="email"
                label='Email'
              />
              <PasswordInput
                placeholder={"Password"}
                name="password"
                style={state.validationMessage.passwordClass}
                onChange={handleChange}
                disabled={state.showOTP}
              />
              <PasswordInput
                placeholder={"Confirm Password"}
                onChange={handleChange}
                disabled={state.showOTP}
                id="confirmpassword"
                name="confirmpassword"
                viewButton={false}
              />
              {state.showSpinner && <FormSpinner spinnerStyle={spinnerStyle} />}
              {!state.showSpinner && state.showOTP && <OtpForm email={state.inputs.email} resendOTP={sendRequest} requestFor={"ForgotPassword"} />}
              {!state.showOTP && !state.showSpinner && <Button
                title={"Send-OTP"}
                type={"Submit"}
                btn_name={"Send OTP"}
                icon={"bi bi-send"}
              />}
            </FormContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
