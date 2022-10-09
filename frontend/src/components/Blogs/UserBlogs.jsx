import React from 'react'
import Blog from './Blog';
import Heading from './Heading';
import axios from 'axios';
import { useState, useEffect} from 'react';
export default function UserBlogs(props) {
  const [blogs, setBlogs] = useState([]);
  const baseServerUrl = "http://localhost:5000/";
  const userId = localStorage.getItem("userId");
  const sendRequest = async ()=>{
    const res = await axios.get(`${baseServerUrl}blogs/user/${userId}`)
                      .catch((err)=>console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(()=>{
    sendRequest().then(data => setBlogs(data.blogs));
  }, [blogs]);

  return (
    <>
      <div className='container-fluid blogs'>
        <Heading content={"Your Blogs"}></Heading>
        <div className="row justify-content-center">
          {blogs.map((item) => <Blog key={item._id} blog={item} canmodify={true} modify = {props.setUpdateBlog}></Blog>)}
        </div>
      </div>
    </>
  )
}
