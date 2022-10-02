import React from 'react';
import { useState, useRef } from 'react';
import Heading from './Heading';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
// import { useEffect } from 'react';
export default function AddBlog() {
  const baseServerUrl = "http://localhost:5000/";
  let userId = localStorage.getItem("userId");
  const params = useParams();
  const blogId = params.id;
  const editor = useRef(null);
  const navigate = useNavigate();
  const [newBlog, setNewBlog] = useState({ title: "", description: "" });


  const handleChange = (event) => {
      setNewBlog((prevSate) => ({
        ...prevSate, // first it will derefernce the prevState and set it then 
        [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
      }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (newBlog.title === "" || newBlog.description === "")
      alert(`${newBlog.title === ""?"Title":"Description"} must not be empty`);
    else {
      if (blogId === undefined) {
        sendRequestAdd()
          .then(data => console.log(data))
          .then(() => navigate('/blogs'));
      }
      else {
        sendRequestUpdate()
          .then(data => console.log(data))
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
                <input onChange={handleChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder="This I my First Blog" name="title" />
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
