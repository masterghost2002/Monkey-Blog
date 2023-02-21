import { useRef, useState } from "react";
import { Container, HStack, useColorMode, FormLabel, Text, Button, VStack, CircularProgress } from "@chakra-ui/react";

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
// <iframe> tag specifies an inline frame. An inline frame is used to embed another document within the current HTML document. Tip: Use CSS to style the <iframe> (see example below). Tip: It is a good practice to always include a title attribute for the <iframe> .

function returnConfig(themeSide) {
    return { theme: themeSide,
        minHeight: editor_config.minHeight,
        zIndex:1000,
        toolbarDisableStickyForMobile: false,
        iframe: true // use it else all feature like li bold will not work
    }
}
export default function AddUpdate() {
    
    var { addToast } = CustomToast();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoader, setIsLoader] = useState(false);

    var param = useParams();
    var blogId = param.id;

    const { colorMode } = useColorMode();
    var navigate = useNavigate();
    const editor = useRef(null);
    var config = useMemo(() => returnConfig(colorMode), [colorMode]);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleBlog = useCallback(async () => {
        if (blogId === undefined) return;
     
        const response = await GET_BLOG_BY_ID(blogId);
        if (response.request.status === 401) {
            navigate('/notfound');
            return;
        }
        const _blog = await response.data.blog;
        setTitle(_blog.title);
        setDescription(_blog.description);
    }, [blogId, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (title.trim() === '' || description.trim() === '') {
            const emptyField = title.trim() === '' ? 'Title' : 'Description';
            addToast({ title: 'Empty Field', message: `${emptyField} must not be empty`, status: 'error' });
            return;
        }

        const blogInfo = {
            title: title,
            description: description,
            blogId: blogId
        }
        setIsLoader(true);
        switch (blogId) {
            case undefined: {
                const response = await REQUEST_ADD_BLOG(blogInfo);
                setIsLoader(false);
                if (response.request.status === 200)
                    addToast({ title: 'Hurray !', message: 'Your blog is added', status: 'success' });

                else addToast({ title: 'Error', message: response.request.message, status: 'error' });
                navigate('/myblogs');
                break;
            }
            default: {
                const response = await UPDATE_BLOG(blogInfo);
                // if  response.status !== 200 failed to update the blog
                setIsLoader(false);
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
        setIsLoader(false);
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
                        defaultValue = {title}
                        varient = 'filled'
                    />
                    <FormLabel fontWeight={'bold'}>Description</FormLabel>
                    <JoditEditor
                        ref={editor}
                        value={description}
                        tabIndex={1}
                        name="description"
                        config={config}
                        onBlur={newContent=>setDescription(newContent)}
                    />
                    <VStack>
                    {!isLoader && <Button type='submit' mt={10} width='100%' colorScheme='green'>{blogId === undefined?'Add Blog':'Update Blog'}</Button>}
                    {isLoader && <CircularProgress isIndeterminate color='blue.300' />}
                    </VStack>
                </FormContainer>
            </VStack>
        </Container>
    )
}
