import { Container, VStack, Text, useColorMode, HStack, Image } from "@chakra-ui/react";
import React from 'react'
import Splash_logo from '../../assests/animation/puff.svg';
export default function LogoSplash() {
    const { colorMode } = useColorMode();
    return (
        <Container maxWidth='container.xlg' height='100vh' display='flex'  justifyContent='center' alignItems='center'>
            <VStack>
                <HStack>
                    <Text fontSize='2xl' fontWeight='bold' color='blue.500'>MONKEY</Text><Text fontSize='2xl' fontWeight='bold' color={colorMode === 'light' ? 'black' : 'white'}>APP</Text>
                </HStack>
                <Image
                    src = {Splash_logo}
                />
            </VStack>
        </Container>
    )
}
