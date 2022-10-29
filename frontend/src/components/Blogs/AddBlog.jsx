import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';

// components
import Heading from './Heading';
import { notifyAdd } from '../Toastify/ToastNotifications';

export default function AddBlog(props) {
  const baseServerUrl = "https://masterghostblog.herokuapp.com/";

  // localstorage
  const AUTH_ACCESS_TOKEN = localStorage.getItem("auth_access_token");
  const userInfo = useSelector((state)=>state.userInfo);

  //store
  const themeSide = useSelector((state) => state.themeSide);

  //router dom
  const navigate = useNavigate();

  //props destructure to prevent looping while changing of progress bar
  const progressHandler = props.progressHandler;

  //editor 
  const editor = useRef(null);
  function returnThemeSide(themeSide) {
    return { theme: themeSide }
  }
  var config = useMemo(() => returnThemeSide(themeSide), [themeSide]); //use memo return memoized value

  // get the the params from the url if updating the blog (blog._id)
  const params = useParams();
  const blogId = params.id;

  // state of blog
  const [newBlog, setNewBlog] = useState({ title: "", description: "" });

  //  use effect
  useEffect(() => {
    const sendRequestGetBlog = async () => {
      progressHandler(27);
      const res = await axios.get(`${baseServerUrl}blogs/${blogId}`).catch((err) => console.log(err));
      const data = await res.data;
      setNewBlog({
        title: data.blog.title,
        description: data.blog.description
      })
      progressHandler(100);
    }
    if (blogId !== undefined) {
      sendRequestGetBlog();
    }
  }, [blogId, progressHandler]);





  const handleChange = (event) => {
    setNewBlog((prevSate) => ({
      ...prevSate, // first it will derefernce the prevState and set it then 
      [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    progressHandler(27);
    if (newBlog.title === "" || newBlog.description === "")
      alert(`${newBlog.title === "" ? "Title" : "Description"} must not be empty`);
    else {
      if (blogId === undefined) {
        sendRequestAdd()
          .then(() => {
            navigate('/myBlogs')
          });
      }
      else {
        sendRequestUpdate()
          .then((res) => {
            if (res.status === 401) {
              navigate('/notfound');
              progressHandler(100);
            }
            else{
              navigate('/myBlogs');
            }
          })
          .catch((error) => console.log(error));
      }
    }

  }

  // add new blog
  const sendRequestAdd = async () => {
    const res = await axios.post(`${baseServerUrl}blogs/add`, {
      title: newBlog.title,
      description: newBlog.description,
      user: userInfo.userId
    }).catch(err => console.log(err));
    const data = await res.data
    return data;
  }

  // update
  const sendRequestUpdate = async () => {
    let reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN}` } });
    const res = await reqInstance.put(`${baseServerUrl}blogs/update/${blogId}`, {
      title: newBlog.title,
      description: newBlog.description,
      user: userInfo.userId
    }).catch(error => error);
    return res;
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
                  config={config}
                  onChange={newContent => setNewBlog((prevSate) => ({
                    ...prevSate,
                    'description': newContent
                  }))}
                />
              </div>
              <button className='btn add-blog-btn' onClick={()=>notifyAdd(blogId !== undefined)}>{blogId === undefined ? "Add Blog" : "Update Blog"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
