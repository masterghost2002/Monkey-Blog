import React, { useState, useCallback, useEffect } from 'react';
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
  IconButton
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { avatar_img } from '../../assests/data';
import { GET_BLOG_BY_ID } from '../BackendResponses/backendRequest';
import { CalendarIcon, MoonIcon, SunIcon, LinkIcon} from '@chakra-ui/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { CustomToast } from '../Reponses/Toast';
import { GrDocumentPdf } from 'react-icons/gr';

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
  const { colorMode, toggleColorMode } = useColorMode();
  const {addToast} = CustomToast();
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
                  <Avatar name='Segun Adebayo' src={avatar_img.link} />
                  <Box>
                    <Heading size='sm'>{blog.userName}</Heading>
                    <Text color='red.300'><CalendarIcon /> {blog.date}</Text>
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
        <CardBody px={10}>
          <Text fontWeight='bold' fontSize='xl' py={2}>Title: {blog.title}</Text>
          <Divider />
          <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.description) }} />
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
              <IconButton variant='ghost' icon={<LinkIcon />} aria-label="copy_to_clipboard"
                onClick={() => addToast({ message: 'Blog link copied to clipboard', status: 'success' })}
              />
            </CopyToClipboard>
            <IconButton variant='ghost' icon={<GrDocumentPdf color='red'/>} aria-label="download_as_pdf"/>
          </HStack>

        </CardFooter>
      </Card>

    </Container>
  )
}
