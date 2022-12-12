import { useRef, useState } from "react";
import { Container, HStack, useColorMode, FormLabel, Text, Button, VStack } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { editor_config } from "../../assests/data";
import FormContainer from "../FormComponents/FormContainer";
import SimpleInput from "../FormComponents/SimpleInput";

import { CustomToast } from '../Reponses/Toast';
import { REQUEST_ADD_BLOG, UPDATE_BLOG, GET_BLOG_BY_ID } from '../BackendResponses/backendRequest';
import { useMemo } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

function returnConfig(themeSide) {
    return { theme: themeSide, minHeight: editor_config.minHeight, zIndex:1000 };
}
export default function AddUpdate() {

    var { addToast } = CustomToast();
    const [blog, setBlog] = useState({ title: '', description: '' });

    var param = useParams();
    var blogId = param.id;

    const { colorMode } = useColorMode();
    const userInfo = useSelector((state) => state.userInfo);
    var navigate = useNavigate();
    const editor = useRef(null);
    var config = useMemo(() => returnConfig(colorMode), [colorMode]);

    const handleChange = (event) => {
        setBlog((prevSate) => ({
            ...prevSate, // first it will derefernce the prevState and set it then 
            [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
        }));
    };

    const handleBlog = useCallback(async () => {
        if (blogId === undefined) return;
     
        const response = await GET_BLOG_BY_ID(blogId);
        if (response.request.status === 401) {
            navigate('/notfound');
            return;
        }
        const _blog = await response.data.blog;
        setBlog({
            title: _blog.title,
            description: _blog.description
        })
    }, [blogId, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (blog.title.trim() === '' || blog.description.trim() === '') {
            const emptyField = blog.title.trim() === '' ? 'Title' : 'Description';
            addToast({ title: 'Empty Field', message: `${emptyField} must not be empty`, staus: 'error' });
            return;
        }

        const blogInfo = {
            title: blog.title,
            description: blog.description,
            userId: userInfo.userId,
            blogId: blogId
        }

        switch (blogId) {
            case undefined: {
                const response = await REQUEST_ADD_BLOG(blogInfo);
                if (response.request.status === 200)
                    addToast({ title: 'Hurray !', message: 'Your blog is added', status: 'success' });

                else addToast({ title: 'Error', message: response.request.message, status: 'error' });
                navigate('/myblogs');
                break;
            }
            default: {
                const response = await UPDATE_BLOG(blogInfo);
                // if  response.status !== 200 failed to update the blog
                if (response.status !== 200) {
                    addToast({ title: 'Validation Error', meassage: response.data.validationError, status: 'error' });
                    navigate('/blogs');
                }
                else {
                    addToast({ title: 'Hurray !', message: 'Your blog is updated', status: 'success' });
                    navigate('/myblogs');
                }
                break;
            }
        }
    }
    useEffect(() => {
        handleBlog();
    }, [handleBlog]);
    return (
        <Container maxWidth='container.lg' minHeight='80vh' mt={20}>
            <VStack>
                <HStack width='100%' justifyContent='center'>
                    <Text fontSize='3xl' fontWeight='bold' >{blogId === undefined ? 'Add Blog' : 'Update Blog'}</Text>
                </HStack>
                <FormContainer handleSubmit={handleSubmit}>
                    <SimpleInput
                        label={'Title'}
                        name='title'
                        type='text'
                        onChange={handleChange}
                        defaultValue = {blog.title}
                        varient = 'filled'
                    />
                    <FormLabel fontWeight={'bold'}>Description</FormLabel>
                    <JoditEditor
                        ref={editor}
                        value={blog.description}
                        tabIndex={1}
                        name="description"
                        config={config}
                        onChange={newContent => setBlog((prevSate) => ({
                            ...prevSate,
                            'description': newContent
                        }))}
                    />
                    <Button type='submit' mt={10} width='100%' colorScheme='green'>{blogId === undefined?'Add Blog':'Update Blog'}</Button>
                </FormContainer>
            </VStack>
        </Container>
    )
}
