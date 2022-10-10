import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import Heading from './Heading';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
export default function AddBlog() {
  let userId = localStorage.getItem("userId");
  const params = useParams();
  const blogId = params.id;
  const baseServerUrl = "https://masterghostblog.herokuapp.com/";
  const [newBlog, setNewBlog] = useState({ title: "", description: "" });
  useEffect(() => {
    const sendRequestGetBlog = async () => {
      const res = await axios.get(`${baseServerUrl}blogs/${blogId}`).catch((err) => console.log(err));
      const data = await res.data;
      setNewBlog({
        title:data.blog.title,
        description:data.blog.description
      })
    }
    if (blogId !== undefined){
      sendRequestGetBlog();
    }
  }, [blogId]);



  const editor = useRef(null);
  const navigate = useNavigate();


  const handleChange = (event) => {
    setNewBlog((prevSate) => ({
      ...prevSate, // first it will derefernce the prevState and set it then 
      [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (newBlog.title === "" || newBlog.description === "")
      alert(`${newBlog.title === "" ? "Title" : "Description"} must not be empty`);
    else {
      if (blogId === undefined) {
        sendRequestAdd()
          .then(() => navigate('/blogs'));
      }
      else {
        sendRequestUpdate()
          .then(() => navigate('/blogs'));
      }
    }

  }

  // add new blog
  const sendRequestAdd = async () => {
    const res = await axios.post(`${baseServerUrl}blogs/add`, {
      title: newBlog.title,
      description: newBlog.description,
      user: userId
    }).catch(err => console.log(err));
    const data = await res.data
    return data;
  }

  // update
  const sendRequestUpdate = async () => {
    const res = await axios.put(`${baseServerUrl}blogs/update/${blogId}`, {
      title: newBlog.title,
      description: newBlog.description,
      user: userId
    }).catch(err => console.log(err));
    const data = await res.data
    return data;
  }



  return (
    <>
      <div className='container-fluid blogs'>
        <Heading content={blogId === undefined ? "Add New Blog" : "Update Blog"}></Heading>
        <div className="row justify-content-center mt-1">
          <div className="col-lg-10">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label fs-3 fw-bold">Title</label>
                <input onChange={handleChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title..." name="title" value={newBlog.title} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3 fw-bold">Description</label>
                <JoditEditor
                  ref={editor}
                  value={newBlog.description}
                  tabIndex={1}
                  name="description"
                  onChange={newContent => setNewBlog((prevSate) => ({
                    ...prevSate,
                    'description': newContent
                  }))}
                />
              </div>
              <button className='btn add-blog-btn'>{blogId === undefined ? "Add Blog" : "Update Blog"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
