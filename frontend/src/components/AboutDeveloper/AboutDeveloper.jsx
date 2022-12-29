import React from 'react'
import { SimpleGrid, GridItem, Image, Container, Heading, Divider, Text, VStack, Box, HStack, IconButton, Link, useColorMode, Flex, Tooltip } from '@chakra-ui/react';
import Profile from '../../assests/images/profile_.jpg';
import { about_developer } from '../../assests/data';
import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { SiGmail, SiLeetcode } from 'react-icons/si';
import { social_links } from '../../assests/data';

import Skills from './Skills';
export default function AboutDeveloper() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Container maxWidth='container.xlg' minHeight='80vh' p={[5, 10]}>
            <HStack justifyContent='center'>
                <Heading >About Developer</Heading>
                <IconButton
                    bg='transparent'
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon color='yellow.300' />}
                    onClick={() => toggleColorMode()}
                    aria-label="themeSwitcher"
                />
            </HStack>
            <Divider py={2} />
            <SimpleGrid
                py={5}
                columns={[1, 2]}
                rowGap={10}
                columnGap={2}
                justifyContent='space-between'
            >
                {/* profile pic */}
                <GridItem align='center' colSpan={[2, 1]} width='100%' px={[0, 2]}>
                    <Image
                        borderRadius='full'
                        boxSize={['250px', '350']}
                        src={Profile}
                        alt='Dan Abramov'
                    />
                </GridItem>

                {/* social links and about */}
                <GridItem colSpan={[2, 1]} px={[0, 2]}>
                    <VStack align='flex-start'>
                        <Heading
                            bgGradient='linear(to-l, #7928CA, #FF0080)'
                            bgClip='text'
                            my={2}>
                            {about_developer.name}
                        </Heading>
                        <Heading size={['sm', 'md']} bgGradient={[
                            'linear(to-tr, teal.300, yellow.400)',
                            'linear(to-t, blue.200, teal.500)',
                            'linear(to-b, orange.100, purple.300)',]}
                            bgClip='text'
                        >
                            {about_developer.heading}</Heading>
                        <Text fontWeight={'bold'}>{about_developer.breif_about}</Text>
                        <Box width='100%'>
                            <Heading bgGradient={[
                                'linear(to-tr, teal.300, yellow.400)',
                                'linear(to-t, blue.200, teal.500)',
                                'linear(to-b, orange.100, purple.300)',]}
                                bgClip='text'>My Socials</Heading>
                            <Flex gap='5' flexWrap='wrap' justifyContent='space-between' py='5'>
                                <Tooltip hasArrow label='LinkedIn' bg='gray.300' color='black'>
                                    <IconButton as={Link}
                                        borderRadius='full'
                                        width={['50px', '60px']}
                                        height={['50px', '60px']}
                                        _hover={{ color: '#0077b5', transition: '.4s', transform: 'scale(1.1)' }}
                                        href={social_links.linkedIn}
                                        isExternal={true}
                                    >
                                        <FaLinkedinIn size='30px' />
                                    </IconButton>

                                </Tooltip>
                                <Tooltip hasArrow label='Git Hub' bg='gray.300' color='black'>

                                    <IconButton as={Link}
                                        borderRadius='full'
                                        width={['50px', '60px']}
                                        height={['50px', '60px']}
                                        _hover={{ transition: '.4s', transform: 'scale(1.1)' }}
                                        href={social_links.github}
                                        isExternal={true}
                                    >
                                        <FaGithub size='30px' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip hasArrow label='Instagram' bg='gray.300' color='black'>

                                    <IconButton as={Link}
                                        borderRadius='full'
                                        width={['50px', '60px']}
                                        height={['50px', '60px']}
                                        _hover={{ color: '#bc2a8d', transition: '.4s', transform: 'scale(1.1)' }}
                                        href={social_links.Instagram}
                                        isExternal={true}
                                    >
                                        <FaInstagram size='30px' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip hasArrow label='Mail' bg='gray.300' color='black'>

                                    <IconButton as={Link}
                                        borderRadius='full'
                                        width={['50px', '60px']}
                                        height={['50px', '60px']}
                                        _hover={{ color: '#BB001B', transition: '.4s', transform: 'scale(1.1)' }}
                                        href={social_links.mail}
                                        isExternal={true}
                                    >
                                        <SiGmail size='30px' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip hasArrow label='LeetCode' bg='gray.300' color='black'>

                                    <IconButton as={Link}
                                        borderRadius='full'
                                        width={['50px', '60px']}
                                        height={['50px', '60px']}
                                        _hover={{ bg: '#E7A41F', transition: '.4s', transform: 'scale(1.1)' }}
                                        href={social_links.leetcode}
                                        isExternal={true}

                                    >
                                        <SiLeetcode size='30px' />
                                    </IconButton>
                                </Tooltip>

                            </Flex>
                        </Box>
                    </VStack>
                </GridItem>
            </SimpleGrid>
            <Divider />
            {/* skills */}

            <Skills />

        </Container>
    )
}
