export const INITIAL_STATE = {
    inputs:{
        name: "",
        email:"",
        password: "",
        confirmpassword: ""
    },
    validationMessage:{
        OtpClass: "",
        EmailClass:"",
        passwordClass: ""
    },
    isSignUp: false,
    showOTP: false,
    showSpinner: false
};
export const authReducer = (state, action)=> {
    switch(action.type){
        case "SEND_REQUEST":
            return {
                ...state,
                showSpinner: true
            };
        case "SEND_REQUEST_DONE":
            return {
                ...state,
                showSpinner: false
            };
        case "SUCCESS_SIGNUP_OTP":
            return {
                ...state, 
                showOTP: true
            };
        case "FAILED_AUTH_EMAIL":
            return{
                ...state,
                validationMessage :{EmailClass: "border-danger animate__animated animate__shakeX"},
            };
        case "FAILED_AUTH_PASSWORD":
            return{
                ...state,
                validationMessage:{passwordClass: "border-danger animate__animated animate__shakeX "},
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