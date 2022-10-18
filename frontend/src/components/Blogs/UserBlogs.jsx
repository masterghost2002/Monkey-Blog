import React from 'react'
import BlogCard from './BlogCard';
import Heading from './Heading';
import axios from 'axios';
import { useState, useEffect} from 'react';
import NoBlog from '../Responses/NoBlog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function UserBlogs() {
  const [blogs, setBlogs] = useState([]);
  const baseServerUrl = "https://masterghostblog.herokuapp.com/";
  const userId = localStorage.getItem("userId");

  // const userId = localStorage.getItem("userId");

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

  const sendRequest = async ()=>{
    const res = await axios.get(`${baseServerUrl}blogs/user/${userId}`)
                      .catch((err)=>console.log(err));
    const data = await res.data;
    setBlogs(data.blogs);
  }

  useEffect(()=>{
    sendRequest();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className='container-fluid blogs'>
        <Heading content={"Your Blogs"}></Heading>
        <div className="row justify-content-center">
          {blogs.length?blogs.map((item) => <BlogCard  key={item._id} blog={item} canmodify={true} onDelete={sendRequest} notificationDelete = {notifyDelete} notificationCopy = {notifyCopy}></BlogCard>):<NoBlog/>}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
