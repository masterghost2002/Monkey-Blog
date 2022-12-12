import { useState } from 'react';
import {
    Heading,
    HStack,
    PinInput,
    PinInputField,
    VStack,
    Button,
    Text,
    CircularProgress
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import { CustomToast } from '../../Reponses/Toast';
import { SIGNUP_OTP_VERIFY, FORGOT_PASSWORD_OTP_VERIFY } from '../../BackendResponses/backendRequest';
export default function OtpVerify(props) {
    const [otp, setOtp] = useState(0);
    const { addToast } = CustomToast();

    // set spinner true after otp sent success
    const navigate = useNavigate();
    const email = props.state.inputs.email;

    // invoke the sendrequest function which further call the  BACKEND FUNCTION
    const handelVerify = (event) => {
        event.preventDefault();
        const strOTP = String(otp);
        sendRequest(strOTP);
    }
 
    // sendRequest funtion will handle the backend realted work
    const handleChange = (event)=>{
        if(props.state.validationMessage.otpInvalid === true)
            props.dispatchState({type:'RESET_VALIDATION'});
        setOtp(event);
    }
    const sendRequest = async (strOTP) => {
        props.dispatchState({type:'SHOW_LOADER'});
        // requestData obj to send backend request
        const requestData = {
            email: email,
            OTP: strOTP
        };
        let response;

        switch(props.state.authType){
            case 'Sign-Up':
                response = await SIGNUP_OTP_VERIFY(requestData);
                break;
            case 'Reset Password':
                response = await FORGOT_PASSWORD_OTP_VERIFY(requestData);
                break;
            default: return;
        }
        props.dispatchState({type:'HIDE_LOADER'});
        // status === 200 means the user is verified now
        if (response.status === 200) {
            navigate('/');
            return;
        }
        // else show error
        if (response.status !== 200) {
            addToast({ title: 'OTP Error!', message: 'Invalid OTP', status: 'warning' });
            props.dispatchState({type:'FAILED_AUTH_OTP'});
            return;
        }
    }
    return (
        <VStack>
            <Heading>OTP</Heading>
            <Text align='center'>Enter OTP sent to your mail to verify and continue.</Text>
            <HStack>
                <PinInput onChange={handleChange} isInvalid = {props.state.validationMessage.otpInvalid === true}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>
                <HStack>
                    <Button aria-label="resend-otp" rightIcon={<RepeatIcon />} width='100%' onClick={props.handleResend}>Resend</Button>
                    <Button aria-label="verify" colorScheme='green' onClick={handelVerify} width='100%'>Verify</Button>
                </HStack>
                {props.state.loader && <CircularProgress isIndeterminate color='blue.300' />}
        </VStack>
    )
};
