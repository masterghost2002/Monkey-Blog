import React from 'react';
import { useState } from 'react';
import Heading from './Heading';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
// import { useEffect } from 'react';
export default function AddBlog() {
  const baseServerUrl = "http://localhost:5000/";
  let userId = localStorage.getItem("userId");
  const params = useParams();
  const blogId = params.id;
  const navigate = useNavigate();
  const [newBlog, setNewBlog] = useState({ title: "", description: "" });
  // const [input, setInput] = useState();
  // useEffect(()=>{
  //   const sendRequestGetBlog = async ()=>{
  //     const res = await axios.get(`${baseServerUrl}blogs/${blogId}`);
  //     const data = res.data;
  //     setInput({
  //       title:data.title,
  //       description: data.description
  //     });
  //   }
  //   if(blogId !== undefined){
  //       sendRequestGetBlog()
  //       .catch((err)=>console.log(err));
  //   }
  // }, [blogId])




  const handleChange = (event) => {
    setNewBlog((prevSate) => ({
      ...prevSate, // first it will derefernce the prevState and set it then 
      [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
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
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label fs-3 fw-bold">Title</label>
                <input onChange={handleChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder="This I my First Blog"  name="title" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3 fw-bold">Description</label>
                <textarea onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" rows="8" value={newBlog.description} name="description"></textarea>
              </div>
              <button className='btn add-blog-btn'>{blogId === undefined ? "Add Blog" : "Update Blog"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
