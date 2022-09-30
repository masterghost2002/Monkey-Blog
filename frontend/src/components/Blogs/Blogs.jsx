import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
import Heading from './Heading';
export default function Blogs() {
  const baseServerUrl = "http://localhost:5000/"
  const [blogs, setBlogs] = useState([]);
  // server requets
  const sendRequest = async () => {
    const res = await axios.get(`${baseServerUrl}blogs/`)
      .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  // use effect
  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs));
  }, []);
  return (
    <>
      <div className='container-fluid blogs'>
        <Heading content={"Latest Blogs"}></Heading>
        <div className="row justify-content-center">
          {blogs.map((item) => <Blog key={item._id} blog={item} canmodify = {false}></Blog>)}
        </div>
      </div>
    </>

  )
}
