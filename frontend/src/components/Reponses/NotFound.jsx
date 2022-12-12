import React from 'react';
import { Center, Container, Heading, Image, Text, VStack, SimpleGrid, GridItem } from '@chakra-ui/react';
import NOT_FOUND_FACE from '../../assests/images/404_face.png';
export default function NotFound() {
    return (
        <Container maxWidth='container.xlg' height='75vh' >
            <Center height='100%'>
                <SimpleGrid
                    columns={[1, 1, 2]}
                    rowGap={10}
                    columnGap={10}
                >
                    <GridItem colSpan={[2, 1]}>
                        <Center>
                        <Image
                            objectFit='cover'
                            src={NOT_FOUND_FACE}
                            alt='Chakra UI'
                            width={['200px','350px']}
                            height={['150px','250px']}
                        />
                        </Center>
                    </GridItem>
                    <GridItem colSpan={[2, 1]}>
                        <Center height='100%'>
                            <VStack align={['center','flex-start']}>
                                <Heading fontSize={['2xl', '3xl']}>Page Not Found</Heading>
                                <Text fontSize={['sm', 'md']}>Sorry, but we can't find the page you are looking for...</Text>
                            </VStack>
                        </Center>
                    </GridItem>
                </SimpleGrid>
            </Center>
        </Container>
    )
}
