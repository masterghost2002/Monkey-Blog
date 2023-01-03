import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from "jspdf";
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
import DOMPurify from 'dompurify';
import { avatar_img } from '../../assests/data';
import { GET_BLOG_BY_ID } from '../BackendResponses/backendRequest';
import { CalendarIcon, MoonIcon, SunIcon, LinkIcon } from '@chakra-ui/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { CustomToast } from '../Reponses/Toast';
import { GrDocumentPdf } from 'react-icons/gr';
import ConfirmModal from '../Reponses/ConfirmModal';

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

  const generatePDF = () => {
    let pdf_container = document.createElement('div');
    pdf_container.style.width = '550px';
    // pdf_container.style.padding = "30px";

    let blog_description = document.createElement('p');
    blog_description.innerHTML = blog.description;

    let blogTitle = document.createElement('h1');
    blogTitle.innerText = `Title: ${blog.title}`;
    blogTitle.style.color = 'black';
    blogTitle.style.marginBottom = '30px'
    pdf_container.append(blogTitle);
    pdf_container.append(blog_description);



    var doc = new jsPDF("p", "pt", "a4");
    doc.setFontSize(12)
    doc.html(pdf_container,
      {
        margin: [20, 20, 0 , 20],
        callback: function (pdf) {
          pdf.save(`${blog.title}.pdf`);
        }
      });

  }

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
        <CardBody px={10}>
          <SkeletonText noOfLines={12} spacing='4' skeletonHeight='6' isLoaded={isLoaded}>
            <Text fontWeight='bold' fontSize='xl' py={2}>Title: {blog.title}</Text>
          </SkeletonText>
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
            <ConfirmModal
              heading={'Download Blog'}
              body={'This feature is in BETA phase downloaded file may not exactly look same.'}
              handleConfirm={generatePDF}
              icon={<GrDocumentPdf color='red' />}
              confirmBtnName='Download'
              aria-label="delete_blog"
            >
              <GrDocumentPdf color='red' />
            </ConfirmModal>
          </HStack>

        </CardFooter>
      </Card>

    </Container>
  )
}
