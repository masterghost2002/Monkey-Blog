export const INITIAL_STATE = {
    inputs:{
        name: "",
        email:"",
        password: ""
    },
    validationMessage:{
        OtpClass: "",
        EmailClass:"",
        passwordClass: ""
    },
    isSignUp: false,
    viewPassword: false,
    showOTP: false,
    spinnerState: false
};
export const authReducer = (state, action)=> {
    switch(action.type){
        case "SEND_REQUEST":
            return {
                ...state,
                spinnerState: true
            };
        case "SEND_REQUEST_DONE":
            return {
                ...state,
                spinnerState: false
            };
        case "SUCCESS_SIGNUP_OTP":
            return {
                ...state, 
                showOTP: true
            };
        case "FAILED_AUTH_EMAIL":
            return{
                ...state,
                validationMessage :{EmailClass: "danger animate__animated animate__shakeX"},
            };
        case "FAILED_AUTH_PASSWORD":
            return{
                ...state,
                validationMessage:{passwordClass: "danger animate__animated animate__shakeX "},
            };
        case "SIGNUP_OTP":
            return{
                ...state,
                validationMessage:{OtpClass: action.payload}
            };
        case  "RESET_VALIDATION":
            return {
                ...state,
                validationMessage:{OtpClass: "", EmailClass: "", passwordClass:""},
            };
        case "SET_TYPE":
            return{
                ...state, 
                isSignUp : !state.isSignUp
            }
        case "PASSWORD_VISIBILITY":
            return{
                ...state,
                viewPassword: !state.viewPassword
            }
        case "FORM_INPUTS":
            return{
                ...state, 
                inputs: {...state.inputs, [action.payload.target.name] : action.payload.target.value}
            }
        default: 
        return{
            state
        }
    }
}