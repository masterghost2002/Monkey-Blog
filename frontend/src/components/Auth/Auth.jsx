import { React, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import { NavLink, useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess, notifyWelcome } from '../Toastify/ToastNotifications';
import { LOGIN_REQUEST, SIGNUP_REQUEST } from '../BackendResponses/backendRequest';
import { INITIAL_STATE, authReducer } from '../States/AuthStates';

// formm
import FormContainer from '../Form/FormContainer';
import FormHeading from '../Form/FormComponents/FormHeading';
import SubHeading from '../Form/FormComponents/SubHeading';
import SimpleInput from '../Form/FormComponents/SimpleInput';
import PasswordInput from '../Form/FormComponents/PasswordInput';
import OtpForm from '../Form/FormComponents/OtpForm';
import FormSpinner from '../Form/FormComponents/FormSpinner';
import spinnerStyle from '../../assests/animations/oval.svg';
import Button from '../Modals/Button';


export default function Auth(props) {

    const validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // router dom and server
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //props destructure to prevent looping while changing of progress bar
    const progressHandler = props.progressHandler;

    const subHeadingSignUp = { primaryHeading: "Already Have a account?", secondaryHeading: "SignIn" };
    const subHeadingSignIn = { primaryHeading: "New Here?", secondaryHeading: "Create a New Account" };
    //loader and state.showOTP component states
    const [state, dispatchState] = useReducer(authReducer, INITIAL_STATE);


    // form handle change
    const handleChange = (event) => {
        event.preventDefault();
        dispatchState({ type: "RESET_VALIDATION" });
        dispatchState({ type: "FORM_INPUTS", payload: event });
    };


    // backend functions
    // login-signup
    const sendRequest = async () => {
        let response;
        //  !isSingUP --> login
        //setSpinner true
        dispatchState({ type: "SEND_REQUEST" });
        if (!state.isSignUp) {
            progressHandler(27);
            response = await LOGIN_REQUEST(state.inputs);
        }
        else
            response = await SIGNUP_REQUEST(state.inputs);
        dispatchState({ type: "SEND_REQUEST_DONE" });
        // handle sucess request for signup
        if (response.status === 200 && !state.isSignUp) {
            const data = await response.data;
            const user = await data.user;
            if (user.themeSide === 'dark')
                dispatch(authActions.setThemeSideDark());
            else dispatch(authActions.setThemeSideLight());
            dispatch(authActions.login([user._id, user.name]));
            localStorage.setItem("auth_access_token", data.accessToken);
            notifyWelcome(user.name);
            navigate('/blogs');
            return;
        }

        // handle success request for signup 
        // the otp confirmation will be handle by OTP component by itself
        if (response.status === 200 && state.isSignUp) {

            //set state.showOTP true
            dispatchState({ type: "SUCCESS_SIGNUP_OTP" });
            notifySuccess("OTP Sent");
            dispatchState({ type: "SIGNUP_OTP", payload: "successs" });
            return;
        }

        // handle failed requests
        //failed request for login
        if (response.status !== 200 && !state.isSignUp) {
            progressHandler(100);
            notifyError(response.data.message);
            if (response.status === 404)
                dispatchState({ type: "FAILED_AUTH_EMAIL" });
            else if (response.status === 400)
                dispatchState({ type: "FAILED_AUTH_PASSWORD" });
        }
        // failed request for signup
        if (response.status !== 200 && state.isSignUp) {
            notifyError(response.data.message);
            if (response.status === 404 && response.data.message === "Unable to send otp")
                dispatchState({ type: "SIGNUP_OTP" });
            else if (response.status === 404)
                dispatchState({ type: "FAILED_AUTH_EMAIL" });
            else if (response.status === 400)
                dispatchState({ type: "FAILED_AUTH_PASSWORD" });

        }
    }

    // no submition of login/signup form
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!state.inputs.email.match(validMailRegex)) {
            notifyError("Not a valid Email");
            dispatchState({ type: "FAILED_AUTH_EMAIL" });
            return;
        }
        if (state.isSignUp && state.inputs.password !== state.inputs.confirmpassword) {
            notifyError("Password and confrim must be same");
            return;
        }
        if (state.inputs.password.trim().length === 0 || state.inputs.password.length < 8) {
            notifyError("Password Should be 8 character long");
            dispatchState({ type: "FAILED_AUTH_PASSWORD" });
            return;
        }
        if (state.isSignUp && state.inputs.name.trim().length === 0) notifyError("Opps you don't have any name?");

        // after performing some basic valid check move to the backend
        sendRequest();
    }
    return (
        <section className='auth_wrapper'>
            <div className="container-fluid login_component mb-4">
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <FormContainer handleSubmit={handleSubmit}>
                            <FormHeading heading={state.isSignUp ? "Sign-Up" : "Sign-In"} />
                            <SubHeading
                                subHeading={state.isSignUp ? subHeadingSignUp : subHeadingSignIn}
                                changeSubHeading={() => dispatchState({ type: "SET_TYPE" })}
                            />
                            {state.isSignUp && <SimpleInput
                                placeholder={"Full Name"}
                                onChange={handleChange}
                                value = {"Full Name"}
                                name = {"name"}
                                label = 'Full Name'
                            />}
                            <SimpleInput
                                placeholder={"Email"}
                                onChange={handleChange}
                                style={state.validationMessage.EmailClass}
                                disabled={state.showOTP}
                                value = {"Email"}
                                name = {"email"}
                                id = "email"
                                label = 'Email'
                            />
                            <PasswordInput
                                placeholder={"Password"}
                                style={state.validationMessage.passwordClass}
                                name={"password"}
                                onChange={handleChange}
                                disabled={state.showOTP}
                            />
                            {state.isSignUp && <PasswordInput
                                placeholder={"Confirm Password"}
                                onChange={handleChange}
                                disabled={state.showOTP}
                                id="confirmpassword"
                                name="confirmpassword"
                                viewButton={false}
                            />}
                            {!state.isSignUp && <div className="my-3 text-end">
                                <NavLink to="/forgotpassword" className="my-4 forget_btn">Forgot Password?</NavLink>
                            </div>}
                            {state.showSpinner && <FormSpinner spinnerStyle={spinnerStyle} />}
                            {!state.showSpinner && state.showOTP && state.isSignUp && <OtpForm email={state.inputs.email} resendOTP={sendRequest} requestFor={"Signup"} />}
                            {!state.showOTP && !state.showSpinner && <Button
                                title={state.isSignUp ? "Sign-Up" : "Sign-In"}
                                type={"submit"}
                                btn_name={state.isSignUp ? "Sent OTP" : "Sign-In"}
                                icon={state.isSignUp ? "bi bi-send" : "bi bi-box-arrow-in-right fw-bold"}
                            />}
                        </FormContainer>
                    </div>
                </div>
            </div>
        </section>

    )
}
