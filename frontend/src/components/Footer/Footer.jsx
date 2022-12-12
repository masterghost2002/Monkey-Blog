import React from 'react';
import { Box, HStack, VStack, Text, Link, SimpleGrid, GridItem, Divider, useColorMode } from '@chakra-ui/react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { logo_lg } from '../../assests/data';
import { social_links } from '../../assests/data';
export default function Footer() {
    const {colorMode} = useColorMode();
    const logoColor = colorMode === 'light'?'black':'white';
    const linkColor = colorMode === 'light'?'gray.600':'gray.200';
    return (
        <Box
        minHeight={['15vh']}
        p={[5, 10]}
        zIndex={1}
        width= '100%'
        >
            {/* <Divider/> */}
            <SimpleGrid
                pt={2}
                columns={[1, 3]}
                rowGap={3}
            >
                <GridItem colSpan={1} >
                    <HStack justifyContent={'flex-start'}>
                        <Text fontSize='xl' fontWeight='bold' color='blue.500'>{logo_lg.firstPart}</Text><Text fontSize='xl' fontWeight='bold' color={logoColor}>{logo_lg.secondPart}</Text>
                    </HStack>
                </GridItem>
                <GridItem colSpan={1} >
                    <VStack align={['flex-end', 'center']}>
                        <VStack align='flex-start'>
                        <Link color={linkColor} fontWeight='bold' >About US</Link>
                        <Link color={linkColor} fontWeight='bold'>Contact US</Link>
                        </VStack>
                    </VStack>
                </GridItem>
                <Divider display={['inline', 'none']}  />
                <GridItem colSpan={1} >
                    <VStack align={'flex-end'}>
                        <Text fontWeight='bold'>Follow On</Text>
                        <HStack  width='100%' justifyContent='flex-end'>
                            <Link px={4} _hover={{ transition: '.4s', transform: 'scale(1.1)'}} href={social_links.Instagram} aria-label="Instagram">
                                <FaInstagram color='#bc2a8d' fontSize='2em' />
                            </Link>
                            <Link px={4} _hover={{ transition: '.4s', transform: 'scale(1.1)'}} href={social_links.github} aria-label="Github">
                                <FaGithub fontSize='2em' />
                            </Link>
                            <Link px={4} _hover={{ transition: '.4s', transform: 'scale(1.1)'}} href={social_links.linkedIn} aria-label="LinkedIn">
                                <FaLinkedin color='#0A66C2' fontSize='2em' />
                            </Link>
                        </HStack>
                    </VStack>
                </GridItem>
            </SimpleGrid>
        </Box>
    )
}
