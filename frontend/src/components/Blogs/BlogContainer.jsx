import { useState, useEffect, useCallback, useMemo } from "react";
import { Container, SimpleGrid, HStack, VStack, Text, Divider } from "@chakra-ui/react";
import { GET_ALL_BLOGS, GET_USER_BLOGS } from '../BackendResponses/backendRequest';
import { useSelector } from 'react-redux';
import BlogCard from "./BlogComponent/BlogCard";
import SearchBar from "../FormComponents/SearchBar";
import SelectForm from "../FormComponents/SelectForm";
import AddFirstBlog from "../Reponses/AddFirstBlog";
export default function BlogContainer(props) {
    var userInfo = useSelector((state) => state.userInfo);
    // blogs 
    const blogType = useMemo(() => props.type, [props.type]);
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [fetchBlog, setFetchBlog] = useState(false);


    const [searchQuery, setSearchQuery] = useState({ searchInput: '', searchBy: 'Blog Title'});
    const [isSort, setIsSort] = useState(true);
    const sortBlogs = (event) => {
        event.preventDefault();
        if (event.target.value === "Newest First") {
            if (filteredBlogs.length)
                setFilteredBlogs(filteredBlogs.sort((a, b) => a.created_at < b.created_at));
            else setBlogs(blogs.sort((a, b) => a.created_at < b.created_at));
        }
        else if (event.target.value === "Oldest First") {
            if (filteredBlogs.length)
                setFilteredBlogs(filteredBlogs.sort((a, b) => a.created_at > b.created_at));
            else setBlogs(blogs.sort((a, b) => a.created_at > b.created_at));
        }
        setIsSort((prevState)=>!prevState);
    }
    const advanceSearch = (blog, value) => {
        const search_ = value.toLowerCase().replaceAll(' ', '');
        if (searchQuery.searchBy === "Blog Title")
            return blog.title.toLowerCase().replaceAll(' ', '').includes(search_);
        else if (searchQuery.searchBy === "User Name")
            return (blog.user.name.toLowerCase().replaceAll(' ', '')).startsWith(search_);
    }

    const onChangeSearch = (event) => {
        event.preventDefault();
        setSearchQuery({ ...searchQuery, [event.target.name]: event.target.value });
        if (event.target.value === '' || (searchQuery.searchInput === '' && filteredBlogs.length))
            setFilteredBlogs([]);
        else
            setFilteredBlogs(blogs.filter((blog) => advanceSearch(blog, event.target.value)));

        // passing direct value bcz setState took some time to change its state
    }
    const changeSearchType = (event)=>{
        setSearchQuery({ ...searchQuery, [event.target.name]: event.target.value });
    }
    //backend request
    const sendRequest = useCallback(async () => {
        setFetchBlog(true);
        const response = blogType === "All Blogs" ? await GET_ALL_BLOGS() : await GET_USER_BLOGS(userInfo.userId);
        const data = await response.data;
        setFetchBlog(false);
        if (response.request.status === 200) {
            setBlogs(data.blogs);
        }
    }, [userInfo.userId, blogType]);

    // use effect
    useEffect(() => {
        sendRequest();
        return;
    }, [sendRequest]);
    return (
        <Container maxWidth="container.xlg" minHeight="100vh" mt={[20, 20]} >
            <VStack my={5}>
                <HStack width='100%' justifyContent='center'>
                    <Text fontSize='3xl' fontWeight='bold' >{props.type}</Text>
                </HStack>
                <SearchBar
                    onChange={onChangeSearch}
                    children={<SelectForm options={[{ label: 'Blog Title' }, { label: 'User Name' }]} placeholder='Search By' onSelect={changeSearchType} />}
                />
                <SelectForm
                    width={['xsm', 'xsm']}
                    placeholder={'Sort By'}
                    options={[{ label: 'Newest First' }, { label: 'Oldest First' }]}
                    onSelect={sortBlogs}
                    name='sortBy'
                />
            </VStack>
            <Divider />
            <SimpleGrid
                p={[0, 20]}
                columns={[1, 1, 2]}
                rowGap={10}
                columnGap={4}
            >
                {
                    !blogs.length ?
                        <> {!fetchBlog ? <AddFirstBlog /> : <BlogCard loaded={false} />}</> :
                        searchQuery.searchInput === '' ?
                            blogs.length ? blogs.map((item) => <BlogCard key={item._id} blog={item} canmodify={props.type === "All Blogs" ? false : true} onDelete={sendRequest} loaded={true}></BlogCard>) :
                                <BlogCard loaded={false} /> :
                            filteredBlogs.length ? filteredBlogs.map((item) => <BlogCard key={item._id} blog={item} canmodify={props.type === "All Blogs" ? false : true} onDelete={sendRequest} loaded={true}></BlogCard>) :
                                <BlogCard loaded={false} />

                }
            </SimpleGrid>
        </Container>
    )
}
