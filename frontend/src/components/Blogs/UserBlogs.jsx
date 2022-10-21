import React from 'react'
import BlogCard from './BlogCard';
import Heading from './Heading';
import axios from 'axios';
import { useState, useEffect } from 'react';
import NoBlog from '../Responses/NoBlog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkeletonCard from './SkeletonCard';

export default function UserBlogs(props) {
  const [blogs, setBlogs] = useState([]);
  const baseServerUrl = "https://masterghostblog.herokuapp.com/";
  const userId = localStorage.getItem("userId");

  //props destructure to prevent looping while changing of progress bar
  const progressHandler = props.progressHandler;
  const [loader, setLoader] = useState(true);

  //toasts
  const notifyDelete = () => toast.success('Delete Success', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const notifyCopy = () => toast('🦄 Link Copied To Clipboard!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  // toast end

  const sendRequest = async () => {
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
  }

  useEffect(() => {
    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className='container-fluid blogs'>
        <Heading content={"Your Blogs"}></Heading>
        <div className="row justify-content-center">
          {loader?<><SkeletonCard/><SkeletonCard/></>:blogs.length ? blogs.map((item) => <BlogCard key={item._id} blog={item} canmodify={true} onDelete={sendRequest} notificationDelete={notifyDelete} notificationCopy={notifyCopy}></BlogCard>) : <NoBlog />}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
