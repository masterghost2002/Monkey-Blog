export const INITIAL_STATE = {
    inputs: {
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    },
    validationMessage: {
        otpInvalid: false,
        emailInvalid: false,
        passwordInvalid: false
    },
    authType: 'Login',
    showOTP: false,
    loader: false
};
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_LOADER':
            return {
                ...state,
                loader: true
            };
        case 'HIDE_LOADER':
            return {
                ...state,
                loader: false
            };
        case "SUCCESS_SIGNUP_OTP":
            return {
                ...state,
                showOTP: true
            };
        case "HIDE_SHOW_OTP":
            return {
                ...state,
                showOTP: false
            }
        case "FAILED_AUTH_EMAIL":
            return {
                ...state,
                validationMessage: { emailInvalid: true },
            };
        case "FAILED_AUTH_PASSWORD":
            return {
                ...state,
                validationMessage: { passwordInvalid: true },
            };
        case "FAILED_AUTH_OTP":
            return {
                ...state,
                validationMessage: { otpInvalid: true }
            }
        case "RESET_VALIDATION":
            return {
                ...state,
                validationMessage: { otpInvalid: false, emailInvalid: false, passwordInvalid: false },
            };
        case "AUTH_TYPE":
            return {
                ...state,
                authType: action.payload
            }
        case "FORM_INPUTS":
            return {
                ...state,
                inputs: { ...state.inputs, [action.payload.target.name]: action.payload.target.value }
            }
        default:
            return {
                state
            }
    }
}