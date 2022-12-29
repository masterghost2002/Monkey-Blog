import React from 'react';
import { Flex, IconButton, SimpleGrid, GridItem, VStack, Heading, Text, Tooltip } from '@chakra-ui/react';
import { FaGithub, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';
import { DiJavascript, DiMysql, DiHtml5, DiJava } from 'react-icons/di';
import { about_developer } from '../../assests/data';
export default function Skills() {
    return (
        <>
            <SimpleGrid
                py={5}
                columns={[1, 2]}
                rowGap={10}
                columnGap={2}
                justifyContent='space-between'
            >
                <GridItem colSpan={[2, 1]} width='100%'>
                    <VStack align='flex-start'>
                        <Heading textAlign='flex-start' bgGradient={[
                            'linear(to-tr, teal.300, yellow.400)',
                            'linear(to-t, blue.200, teal.500)',
                            'linear(to-b, orange.100, purple.300)',]}
                            bgClip='text'>Skills</Heading>
                        <Text fontWeight={'bold'}>{about_developer.skils_intro}</Text>
                    </VStack>
                </GridItem>
                <SimpleGrid
                    columns={1}
                    rowGap={5}
                    columnGap={10}
                >
                    <GridItem colSpan={1}>
                        <Flex justifyContent={ 'space-between'} colums={[2, 1]} gap={['10', '5']} flexWrap='wrap'>
                            <Tooltip hasArrow label='Java Script' bg='gray.300' color='black'>
                                <IconButton
                                    borderRadius='full'
                                    width={['50px', '60px']}
                                    height={['50px', '60px']}
                                    _hover={{ color: '#E7A41F', transition: '.4s', transform: 'scale(1.1)' }}
                                >
                                    <DiJavascript size='30px' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip hasArrow label='Git' bg='gray.300' color='black'>
                                <IconButton
                                    borderRadius='full'
                                    width={['50px', '60px']}
                                    height={['50px', '60px']}
                                    _hover={{ transition: '.4s', transform: 'scale(1.1)' }}

                                >
                                    <FaGithub size='30px' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip hasArrow label='Node JS' bg='gray.300' color='black'>

                                <IconButton
                                    borderRadius='full'
                                    width={['50px', '60px']}
                                    height={['50px', '60px']}
                                    _hover={{ color: '#215732', transition: '.4s', transform: 'scale(1.1)' }}

                                >
                                    <FaNodeJs size='30px' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip hasArrow label='React' bg='gray.300' color='black'>

                                <IconButton
                                    borderRadius='full'
                                    width={['50px', '60px']}
                                    height={['50px', '60px']}
                                    _hover={{ color: '#blue', transition: '.4s', transform: 'scale(1.1)' }}

                                >
                                    <FaReact size='30px' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip hasArrow label='Mongo DB' bg='gray.300' color='black'>

                                <IconButton
                                    borderRadius='full'
                                    width={['50px', '60px']}
                                    height={['50px', '60px']}
                                    _hover={{ color: '#589636', transition: '.4s', transform: 'scale(1.1)' }}
                                >
                                    <SiMongodb size='30px' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip hasArrow label='My SQL' bg='gray.300' color='black'>

                                <IconButton
                                    borderRadius='full'
                                    width={['50px', '60px']}
                                    height={['50px', '60px']}
                                    _hover={{ transition: '.4s', transform: 'scale(1.1)' }}

                                >
                                    <DiMysql size='30px' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip hasArrow label='HTML 5' bg='gray.300' color='black'>

                                <IconButton
                                    borderRadius='full'
                                    width={['50px', '60px']}
                                    height={['50px', '60px']}
                                    _hover={{ color: '#FF8C00', transition: '.4s', transform: 'scale(1.1)' }}

                                >
                                    <DiHtml5 size='30px' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip hasArrow label='Java' bg='gray.300' color='black'>

                                <IconButton
                                    borderRadius='full'
                                    width={['50px', '60px']}
                                    height={['50px', '60px']}
                                    _hover={{ color: '#blue', transition: '.4s', transform: 'scale(1.1)' }}

                                >
                                    <DiJava size='30px' />
                                </IconButton>
                            </Tooltip>

                        </Flex >
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Text fontWeight={'bold'}>Problem Solving: Solved over 550+ question on Leetcode, Contest Max Rating: 1499</Text>
                    </GridItem>
                </SimpleGrid>

            </SimpleGrid>


        </>
    )
}
