import { useState } from "react";
import { Container, VStack, IconButton, useColorMode, Box, Heading, Flex, Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import FormContainer from '../FormComponents/FormContainer';
import SimpleInput from '../FormComponents/SimpleInput';
import TextArea from "../FormComponents/TextArea";
import { SEND_MAIL } from "../BackendResponses/backendRequest";
import { CustomToast } from '../Reponses/Toast';
export default function ContactUs() {
    const [inputs, setInputs] = useState({
        name: "", email: "",  message: ""
    });
    const {addToast} = CustomToast();
    const { colorMode, toggleColorMode } = useColorMode();
    const handleChange = (event) => {
        setInputs((prevstate)=>({
            ...prevstate,[event.target.name]:event.target.value
        }))
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        let response = await SEND_MAIL(inputs);
        console.log(response);
        // if(response.status === 200)
        // {
        //     addToast({title:'Sent!',message:'Your mail has been sent', status:'Success'});
        //     return;
        // }
        // addToast({title:'Failed :(',message:response.data.message, status:'Error'});
        // return;
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
                            <Button type='submit' width='100%' size='lg' bg='blue.400' _hover={{ bg: 'blue.300' }} aria-label="submit_btn" >Submit</Button>
                        </VStack>
                    </FormContainer>
                </VStack>
            </Box>

        </Container>
    )
}
