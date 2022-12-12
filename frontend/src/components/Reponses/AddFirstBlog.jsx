import React from 'react'
import {VStack, Text, Center, Button, Link, GridItem } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
export default function AddFirstBlog() {
  return (
    <GridItem my={5} colSpan={2} height='100%'>
        <Center height='100%' >
            <VStack>
                <Text fontWeight='bold'>No blog from your Side</Text>
                <Link as={NavLink} to='/addblog'><Button as='nav' colorScheme='blue'>Add Blog</Button></Link>
            </VStack>
        </Center>

    </GridItem>
  )
}
