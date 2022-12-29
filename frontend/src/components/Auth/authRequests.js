import { LOGIN_REQUEST, SIGNUP_REQUEST, FORGOT_PASSWORD_OTP_REQUEST } from '../BackendResponses/backendRequest';
// return true if success
const loginAuth = async (inputs, dispatchState, addToast, dispatch, authActions, colorMode, toggleColorMode) => {
    const response = await LOGIN_REQUEST(inputs);
    if (response.status === 200) {
        const data = await response.data;
        const user = await data.user;
        if(colorMode !== user.themeSide)
            toggleColorMode();

        dispatch(authActions.login([user._id, user.name]));
        
        localStorage.setItem("auth_access_token", data.accessToken);
        addToast({ title: 'Hello!', message: user.name, status: 'success' });
        return true;
    }

    //else condition
    addToast({ title: 'Login!', message: response.data.message, status: 'error' });
    if (response.status === 404)
        dispatchState({ type: "FAILED_AUTH_EMAIL" });
    else if (response.status === 400)
        dispatchState({ type: "FAILED_AUTH_PASSWORD" });
    return false;
}

const signUpAuth = async (inputs, dispatchState, addToast) => {
    const response = await SIGNUP_REQUEST(inputs);
    if (response.status === 200) {
        dispatchState({ type: "SUCCESS_SIGNUP_OTP" });
        addToast({ title: 'OTP!', message: 'Sent Success', status: 'success' });
        return true;
    }

    //else 
    addToast({ title: 'Sign Up!', message: response.data.message, status: 'error' });
    if (response.status === 404 && response.data.message === "Unable to send otp")
        dispatchState({ type: "SIGNUP_OTP" });
    else if (response.status === 404)
        dispatchState({ type: "FAILED_AUTH_EMAIL" });
    else if (response.status === 400)
        dispatchState({ type: "FAILED_AUTH_PASSWORD" });
    return false;

}
const resetPasswordAuth = async (inputs, dispatchState, addToast) => {
    const response = await FORGOT_PASSWORD_OTP_REQUEST(inputs);
    if (response.status === 200) {
        dispatchState({ type: "SUCCESS_SIGNUP_OTP" });
        addToast({ title: 'OTP!', message: 'Sent Success', status: 'success' });
        return true;
    }
    addToast({title:'Password Reset',message:response.data.message, status:'error'});
    if (response.status === 404 && response.data.message !== 'Unable to send otp')
        dispatchState({ type: "FAILED_AUTH_EMAIL" });
    else if (response.status === 400)
        dispatchState({ type: "FAILED_AUTH_PASSWORD" });
    return false;
}
export { loginAuth, signUpAuth, resetPasswordAuth };
