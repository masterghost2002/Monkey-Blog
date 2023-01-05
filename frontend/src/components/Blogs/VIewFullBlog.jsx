import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
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
  useColorMode,
  HStack,
  IconButton,
  Skeleton,
  SkeletonText,
  SkeletonCircle
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { avatar_img } from '../../assests/data';
import { GET_BLOG_BY_ID } from '../BackendResponses/backendRequest';
import { CalendarIcon, MoonIcon, SunIcon, LinkIcon } from '@chakra-ui/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { CustomToast } from '../Reponses/Toast';
import JoditEditor from "jodit-react";
const formatDate = (created_at) => {
  let date = new Date(created_at);
  let dtFromat = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  date = dtFromat.format(date);
  return date;
}


export default function VIewFullBlog() {
  const navigate = useNavigate();
  const params = useParams();
  const [blog, setBlog] = useState({ title: '', description: '', userName: '', date: '' });
  const [isLoaded, setIsLoaded] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { addToast } = CustomToast();


  ///jodit

  const editor = useRef(null);
  var config = {
    toolbarDisableStickyForMobile: false,
    readonly: true,
    buttons: ['print', 'fullsize', 'about'],
    toolbarAdaptive: false,
    toolbarButtonSize: "large",
    theme: colorMode
  };




  const sendRequestGetBlog = useCallback(async () => {
    const response = await GET_BLOG_BY_ID(params.id);
    if (response.status === 200) {
      const data = await response.data;
      setBlog({
        title: data.blog.title,
        description: data.blog.description,
        userName: data.blog.user.name,
        date: formatDate(data.blog.created_at),
      });
      setIsLoaded(true);
    }
    else {
      navigate("/notfound");
    }

  }, [navigate, params.id]);
  useEffect(() => {
    sendRequestGetBlog();
  }, [sendRequestGetBlog]);
  return (
    <Container maxWidth='container.xlg' minHeight='90vh' mt={[0, 10]} py={[10, 10]} px={[2, 20]}>
      <Card maxW='100%'>
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <HStack width='100%' justifyContent='space-between'>
                <HStack>
                  <SkeletonCircle width='50px' height='50px' isLoaded={isLoaded}>
                    <Avatar name='Segun Adebayo' src={avatar_img.link} />
                  </SkeletonCircle>
                  <Box>
                    <Skeleton isLoaded={isLoaded} width='150px'>
                      <Heading size='sm'>{blog.userName}</Heading>
                      <Text color='red.300'><CalendarIcon /> {blog.date}</Text>
                    </Skeleton>
                  </Box>
                </HStack>
                <IconButton
                  icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon color='yellow.300' />}
                  onClick={toggleColorMode}
                  variant='ghost'
                  aria-label="switch_theme"
                />
              </HStack>
            </Flex>
          </Flex>
        </CardHeader>
        <Divider />
        <CardBody padding={0}>
          <SkeletonText noOfLines={12} spacing='4' skeletonHeight='6' isLoaded={isLoaded}>
            <Text p={5} fontWeight='bold' fontSize='xl'>Title: {blog.title}</Text>
          <Divider />
          <JoditEditor
            ref={editor}
            value={blog.description}
            tabIndex={1}
            name="description"
            config={config}
            />
            </SkeletonText>
        </CardBody>
        <Divider />
        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
          <HStack width='100%' justifyContent='space-between'>
            <CopyToClipboard text={`https://monkey-app.netlify.app/blog/${params.id}`}>
              <IconButton variant='ghost' icon={<LinkIcon />} aria-label="copy_to_clipboard" title='Copy Link'
                onClick={() => addToast({ message: 'Blog link copied to clipboard', status: 'success' })}
              />
            </CopyToClipboard>
          </HStack>

        </CardFooter>
      </Card>

    </Container>
  )
}
