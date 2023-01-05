import { useState } from "react";
import { Container, VStack, IconButton, useColorMode, Box, Heading, Flex, Button, CircularProgress } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import FormContainer from '../FormComponents/FormContainer';
import SimpleInput from '../FormComponents/SimpleInput';
import TextArea from "../FormComponents/TextArea";
import { SEND_MAIL } from "../BackendResponses/backendRequest";
import { CustomToast } from '../Reponses/Toast';
import { useNavigate } from "react-router-dom";
export default function ContactUs() {
    const validMailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //mail validation
    const {addToast} = CustomToast();
    const [isLoader, setIsLoader] = useState(false);
    const [inputs, setInputs] = useState({
        name: "", email: "",  message: ""
    });
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    const handleChange = (event) => {
        setInputs((prevstate)=>({
            ...prevstate,[event.target.name]:event.target.value
        }))
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(!inputs.email.match(validMailRegex)){
            addToast({ title: 'Invalid Email', message: "Please Enter a valid email address", status: 'warning' });
            return;
        }
        setIsLoader(true);
        let response = await SEND_MAIL(inputs);
        setIsLoader(false);
        if(response.status === 200)
        {
            addToast({ title: 'Mail Sent Success', message: "Will resolve your query as soon as possible", status: 'success' });
            navigate('/');
            return;
        }
        addToast({ title: 'Mail Sent Failed', message: "Server Error", status: 'error' });
        return;
    }
    return (
        <Container width='container.xlg' minHeight='80vh' display='flex'>
            <Box
                border={['none', '2px']}
                mx='auto'
                my={10}
                borderColor={['none', 'gray.300']}
                p={[5, 10]}
                w={['100%', 'md']}
                alignSelf={['flex-start', 'flex-start']}
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
                    <Flex justifyContent='flex-start' width='100%'>
                        <Heading >Contact US</Heading>
                    </Flex>
                    <FormContainer handleSubmit={handleSubmit}>
                        <SimpleInput
                            label='Full Name'
                            variant='filled'
                            name='name'
                            placeholder='Joe Stark'
                            size='lg'
                            onChange={handleChange}
                        />
                        <SimpleInput
                            label='Email Address'
                            variant='filled'
                            name='email'
                            placeholder='joestartk@monkey.com'
                            size='lg'
                            onChange={handleChange}
                        />
                        <TextArea
                            name='message'
                            label='Message'
                            onChange = {handleChange}
                        />
                        <VStack>
                            {!isLoader && <Button type='submit' width='100%' size='lg' bg='blue.400' _hover={{ bg: 'blue.300' }} aria-label="submit_btn" >Submit</Button>}
                            {isLoader && <CircularProgress isIndeterminate color='blue.300' />}
                        </VStack>
                    </FormContainer>
                </VStack>
            </Box>

        </Container>
    )
}
