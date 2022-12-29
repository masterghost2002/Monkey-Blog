import React from 'react'
import {
    Container,
    VStack,
    Box,
    IconButton,
    useColorMode,
} from '@chakra-ui/react';
import OtpVerify from './OtpVerify';
import AuthForm from './AuthForm.';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { authActions } from '../../../Store';
import { loginAuth, signUpAuth, resetPasswordAuth } from '../authRequests'
export default function AuthContainer(props) {

    const sendRequest = async () => {
        props.dispatchState({type:'SHOW_LOADER'});
        switch (props.state.authType) {
            case 'Login':
                if (await loginAuth(props.state.inputs, props.dispatchState, props.addToast, props.dispatch, authActions, colorMode, toggleColorMode))
                    props.navigate('/blogs');
                break;
            case 'Sign-Up':
                 await signUpAuth(props.state.inputs, props.dispatchState, props.addToast)
                break;
            case 'Reset Password':
                await resetPasswordAuth(props.state.inputs, props.dispatchState, props.addToast)
                break;
            default: return;
        }
        props.dispatchState({type:'HIDE_LOADER'});
    }  
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxWidth="container.xlg" display='flex' minH={'80vh'} >
            <Box
                border={['none', '2px']}
                mx='auto'
                my='10'
                borderColor={['none', 'gray.300']}
                p={[5, 10]}
                w={['100%', 'md']}
                alignSelf={['center', 'center']}
                borderRadius={['none', '8px']}
            >
                <Box textAlign='right'>
                    <IconButton
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon color='yellow.300' />}
                        onClick={toggleColorMode}
                        variant='ghost'
                        aria-label="switch_theme"
                    />
                </Box>
                <VStack spacing={4} width='full'>
                    {!props.state.showOTP && < AuthForm sendRequest={sendRequest} state={props.state} dispatchState={props.dispatchState}/>}
                    {props.state.showOTP && <OtpVerify resendOTP={sendRequest} state = {props.state} dispatchState={props.dispatchState}/>}
                </VStack>
            </Box>
        </Container>
  )
}
