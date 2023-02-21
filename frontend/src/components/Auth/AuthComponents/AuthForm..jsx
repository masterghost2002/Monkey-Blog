import React from 'react';
import {
    Flex,
    Heading,
    Text,
    Link,
    Button,
    HStack,
    useColorMode,
    CircularProgress,
    VStack
} from '@chakra-ui/react';
import FormContainer from '../../FormComponents/FormContainer';
import SimpleInput from '../../FormComponents/SimpleInput';
import PasswordInput from '../../FormComponents/PasswordInput';



import { CustomToast } from '../../Reponses/Toast';

export default function AuthForm(props) {
    const { colorMode } = useColorMode(); //chakra ui theme hooks

    const validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //mail validation

    const { addToast } = CustomToast(); //chakra ui resuable toast

    // form handle change
    const handleChange = (event) => {
        event.preventDefault();
        props.dispatchState({ type: "RESET_VALIDATION" });
        props.dispatchState({ type: "FORM_INPUTS", payload: event });
    };


    // form validate and send request
    const handleSubmit = (event) => {
        event.preventDefault();

        //form validation and submit
        if (!props.state.inputs.email.match(validMailRegex)) {
            addToast({ title: 'Invalid Input', message: "Not a valid email", status: 'warning' });
            props.dispatchState({ type: "FAILED_AUTH_EMAIL" });
            return;
        }
        if (props.state.authType === 'Sign-Up' && props.state.inputs.name.trim().length === 0) {
            addToast({ title: 'Invalid Input', message: "Opps you don't have any name?", status: 'warning' });
            return;
        }
        if (props.state.inputs.password.trim().length === 0 || props.state.inputs.password.length < 8) {
            addToast({ title: 'Invalid Input', message: "Password Should be 8 character long", status: 'warning' });
            props.dispatchState({ type: "FAILED_AUTH_PASSWORD" });
            return;
        }
        if (props.state.authType !== 'Login' && props.state.inputs.password !== props.state.inputs.confirmpassword) {
            addToast({ title: 'Invalid Input', message: "Password and confrim must be same", status: 'warning' });
            props.dispatchState({ type: "FAILED_AUTH_PASSWORD" });
            return;
        }

        // after performing some basic valid check move to the backend
        props.sendRequest();
    }


    return (
        <>
            <HStack >
                <Text display='flex' fontSize='4xl' fontWeight='bold' color='blue.500'>MONKEY</Text><Text fontSize='4xl' fontWeight='bold' display='flex' color={colorMode === 'light' ? 'black' : 'white'}>APP</Text>
            </HStack>
            <Heading alignSelf='flex-start'>{props.state.authType}</Heading>
            <Flex w='100%' justifyContent='flex-start'>
                {props.state.authType === 'Login' && <Text fontWeight='bold' color='gray.500'>Don't have an account? <Link onClick={() => props.dispatchState({ type: 'AUTH_TYPE', payload: 'Sign-Up' })} color='blue.400'>Sign-Up</Link></Text>}
                {props.state.authType === 'Sign-Up' && <Text fontWeight='bold' color='gray.500'>Already have an account? <Link onClick={() => props.dispatchState({ type: 'AUTH_TYPE', payload: 'Login' })} color='blue.400'>Login</Link></Text>}
            </Flex>
            <FormContainer handleSubmit={handleSubmit}>
                {
                    props.state.authType === 'Sign-Up' &&
                    <SimpleInput
                        label='Full Name'
                        variant='filled'
                        name='name'
                        placeholder='Joe Stark'
                        size='lg'
                        onChange={handleChange}
                    />
                }
                <SimpleInput
                    isInvalid = {props.state.validationMessage.emailInvalid === true }
                    label='Email'
                    variant='filled'
                    name='email'
                    placeholder='joe@example.com'
                    size='lg'
                    onChange={handleChange}
                />
                <PasswordInput
                    isInvalid = {props.state.validationMessage.passwordInvalid === true}
                    variant='filled'
                    name='password'
                    label={props.state.authType === 'Reset Password'? 'New Password' : 'Password'}
                    placeholder={props.state.authType === 'Reset Password'? 'New Password' : 'Password'}
                    size='lg'
                    onChange={handleChange}
                />
                {
                    (props.state.authType === 'Sign-Up' || props.state.authType === 'Reset Password') &&
                    <PasswordInput
                        isInvalid = {props.state.validationMessage.passwordInvalid === true}
                        label='Confrim Password'
                        variant='filled'
                        placeholder='Confirm Password'
                        viewButton={false}
                        name='confirmpassword'
                        size='lg'
                        onChange={handleChange}
                    />
                }
                {
                    props.state.authType !== 'Sign-Up' &&
                    <Flex w='100%' justifyContent='flex-end'>
                        {props.state.authType === 'Login' && <Link fontWeight='bold' color='blue.400' mb={4} onClick={() => props.dispatchState({ type: 'AUTH_TYPE', payload: 'Reset Password' })}>Forgot Password?</Link>}
                        {props.state.authType === 'Reset Password' && <Link fontWeight='bold' color='blue.400' mb={4} onClick={() => props.dispatchState({ type: 'AUTH_TYPE', payload: 'Login' })}>Remember Password?</Link>}
                    </Flex>
                }
                <VStack>

                    {!props.state.loader && <Button type='submit' size='lg' bg='blue.400' _hover={{ bg: 'blue.300' }} width='100%' aria-label="submit_btn">{props.state.authType}</Button>}
                    {props.state.loader && <CircularProgress isIndeterminate color='blue.300' />}
                </VStack>
            </FormContainer>
        </>

    )
}
