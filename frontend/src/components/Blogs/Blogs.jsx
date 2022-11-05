import { React, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {GET_ALL_BLOGS, GET_USER_BLOGS} from '../BackendResponses/backendRequest';
// components
import BlogCard from './BlogCard';
import Heading from './Heading';
import SkeletonCard from './SkeletonCard';
import AddBlogFloat from '../Modals/AddBlogFloat';
import NoBlog from '../Responses/NoBlog';

// user blog and blog are merged in one
export default function Blogs(props) {
  // store (store/index.js) functions
  const userInfo = useSelector((state)=>state.userInfo);

  //props destructure to prevent looping while changing of progress bar
  const progressHandler = props.progressHandler;
  const type = props.type;
  //blogs state, loaderstate
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(true);

  // all blogs
  const sendRequest = useCallback(async ()=>{
        await setLoader(true);
        await progressHandler(27);
        const response =  type==="All Blogs"? await GET_ALL_BLOGS(): await GET_USER_BLOGS(userInfo.userId);
        const data = await response.data;
        await progressHandler(100);
        await setLoader(false);
        if(response.request.status === 200)
          setBlogs(data.blogs);
  }, [progressHandler, userInfo.userId, type]);

  // use effect
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return (
    <>
    <div className='container-fluid blogs'>
        <Heading content={type}></Heading>
        <div className="row justify-content-center">
          {loader ? <><SkeletonCard /><SkeletonCard /></> : blogs.length ? blogs.map((item) => <BlogCard key={item._id} blog={item} canmodify={type==="All Blogs"?false:true} onDelete={sendRequest}></BlogCard>) : <NoBlog />}
        </div>
      
      </div>
      <div className='blog_end_message'>
        <span>No more blogs :(</span>
      </div>
      {!loader && <AddBlogFloat />}
    </>

  )
}
