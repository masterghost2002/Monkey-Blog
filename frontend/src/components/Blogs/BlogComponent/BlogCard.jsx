import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Avatar,
    Box,
    Heading,
    Text,
    Divider,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    HStack,
    GridItem,
    Badge
} from '@chakra-ui/react';
import { CustomToast } from '../../Reponses/Toast';
import { CalendarIcon } from '@chakra-ui/icons';
import BlogCardButtons from './BlogCardButtons';
import { DELETE_BLOG_BY_ID } from '../../BackendResponses/backendRequest';
import { images_link } from '../../../assests/data';
export default function BlogCard(props) {
    const navigate = useNavigate();
    const { addToast } = CustomToast();
    const userInfo = useSelector((state) => state.userInfo);

    const htmlString = props.blog === undefined ? '' : props.blog.description;
    const descriptionSM = htmlString.replace(/<[^>]+>/g, '').slice(0, 300);

    //
    const handleDelete = async () => {
        const response = await DELETE_BLOG_BY_ID(props.blog._id);
        if (response.status === 200)
            addToast({ title: 'Blog', message: "Blog Deleted", status: 'success' });
        else addToast({ title: 'Blog', message: response.data.message, status: 'error' });
        props.onDelete();
    }
    const handleEdit = () => {
        navigate(`/updateblog/${props.blog._id}`);
    }

    // date time format if the blog is loading then the props are undefined so, used some default value
    let date = new Date(props.blog === undefined ? 'October 15, 1996 05:35:32' : props.blog.created_at);
    let dtFromat = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    date = dtFromat.format(date);
    return (
        <GridItem my={5}  >
            <HStack justifyContent='center'>
                {/* minW because skeletion will be very small if not done */}
                <Card maxW='md' minW={props.loaded?'auto':'100%'} bg='gray.10'>
                    <CardHeader>
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <SkeletonCircle width='50px' height='50px' isLoaded={props.loaded}>
                                    <Avatar name='Segun Adebayo' src={images_link.avtar_image} alt='Chakra Ui' />
                                </SkeletonCircle>
                                <Box>
                                    <Skeleton isLoaded={props.loaded} mb={1}>
                                        <HStack>
                                            <Heading size='sm'>{props.blog !== undefined ? props.blog.user.name === undefined ? userInfo.userName : props.blog.user.name : ''}</Heading>
                                            {(props.blog !== undefined && props.blog.user.badge !== undefined) && <Badge bg='black' color='blue.400' borderRadius='6px'>{props.blog.user.badge}</Badge>}
                                        </HStack>
                                    </Skeleton>
                                    <Skeleton isLoaded={props.loaded}>
                                        <Text color='red.300'><CalendarIcon /> {date}</Text>
                                    </Skeleton>
                                </Box>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <CardBody >
                        <Text fontWeight='bold' fontSize='xl'>{props.blog !== undefined ? props.blog.title : ''}</Text>
                        <Divider />
                        <SkeletonText noOfLines={4} spacing='4' skeletonHeight='4' isLoaded={props.loaded}>
                            <Text text-align='start'>
                                {descriptionSM}
                            </Text>
                        </SkeletonText>
                    </CardBody>
                    <Divider></Divider>
                    <CardFooter
                        justify='space-between'
                        flexWrap='wrap'
                        sx={{
                            '& > button': {
                                minW: '136px',
                            },
                        }}
                    >
                        <SkeletonText noOfLines={[2,1]} skeletonHeight='10' width='100%' isLoaded={props.loaded}>
                            <BlogCardButtons handleDelete={handleDelete} handleEdit={handleEdit} canmodify={props.canmodify} blog_id={props.blog?props.blog._id:'fetching'}/>
                        </SkeletonText>
                    </CardFooter>
                </Card>
            </HStack>
        </GridItem>
    )
}
