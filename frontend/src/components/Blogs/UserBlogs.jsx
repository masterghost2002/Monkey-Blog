import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
// components
import BlogCard from './BlogCard';
import Heading from './Heading';
import NoBlog from '../Responses/NoBlog';
import SkeletonCard from './SkeletonCard';
import AddBlogFloat from '../Modals/AddBlogFloat';
import { notifyCopy, notifySuccess } from '../Toastify/ToastNotifications';

const userId = localStorage.getItem("userId");
const baseServerUrl = "https://masterghostblog.herokuapp.com/";

export default function UserBlogs(props) {

  const [blogs, setBlogs] = useState([]);

  //props destructure to prevent looping while changing of progress bar
  const progressHandler = props.progressHandler;
  const [loader, setLoader] = useState(true);


  const sendRequest =  useCallback(async () => {
    progressHandler(27);
    const res = await axios.get(`${baseServerUrl}blogs/user/${userId}`)
      .then((reponse) => {
        progressHandler(87);
        return reponse;
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    progressHandler(100);
    setLoader(false);
    setBlogs(data.blogs);
  }, [progressHandler])

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  return (
    <>
      <div className='container-fluid blogs'>
        <Heading content={"Your Blogs"}></Heading>
        <div className="row justify-content-center">
          {loader?<><SkeletonCard/><SkeletonCard/></>:blogs.length ? blogs.map((item) => <BlogCard key={item._id} blog={item} canmodify={true} onDelete={sendRequest} notificationDelete={notifySuccess} notificationCopy={notifyCopy}></BlogCard>) : <NoBlog />}
        </div>
      </div>
      {!loader && <AddBlogFloat/>}
    </>
  )
}
