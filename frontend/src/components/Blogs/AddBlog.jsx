import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
// components
import Heading from './Heading';
import { notifyAdd, notifyError } from '../Toastify/ToastNotifications';
import { REQUEST_ADD_BLOG, UPDATE_BLOG, GET_BLOG_BY_ID } from '../BackendResponses/backendRequest';

export default function AddBlog(props) {
  const userInfo = useSelector((state) => state.userInfo);
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

  const handleChange = (event) => {
    setNewBlog((prevSate) => ({
      ...prevSate, // first it will derefernce the prevState and set it then 
      [event.target.name]: event.target.value // then it will update the name fild which is currently chagning
    }));
  };

  //  handdle blog
  const handleBlog = useCallback(async () => {

    //if blogId is undefined means the user visited the Addblog url to add a new blog not to update the blog
    if (blogId === undefined) return;

    // set the progress bar because now if will fetch the blog from backend
    progressHandler(27);

    const response = await GET_BLOG_BY_ID(blogId);//get blog by id fetch the blog by its id

    // if failed with status 401 invalid blog id is passed and navigate to notfound section
    if (response.request.status === 401) {
      navigate('/notfound');
      progressHandler(100);
    }
    const blog = await response.data.blog; // backend send the blog data attached in from of data.blog


    // set the new blog
    setNewBlog({
      title: blog.title,
      description: blog.description
    })
    progressHandler(100);
  }, [progressHandler, blogId, navigate]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    progressHandler(27);
    if (newBlog.title === "" || newBlog.description === "") {
      alert(`${newBlog.title === "" ? "Title" : "Description"} must not be empty`);
      return;
    }

    //created a blogObject which consist of all its info
    const blogInfo = {
      title: newBlog.title,
      description: newBlog.description,
      userId: userInfo.userId,
      blogId: blogId //if it is a new blog then blog id will be undefined and be handle by the backend itslef
    }

    // if blogId is undefined means we are adding a new blog
    if (blogId === undefined) {
      const response = await REQUEST_ADD_BLOG(blogInfo);
      if (response.request.status === 200)
        notifyAdd(blogId !== undefined);
      else notifyError(response.request.message);
      navigate('/myBlogs');
      return;
    }

    // else we requested to update the blog 
    const response = await UPDATE_BLOG(blogInfo);

    // if  response.status !== 200 failed to update the blog
    if (response.status !== 200) {
      notifyError(response.data.validationError);
      progressHandler(100);
      navigate('/blogs');
      return;
    }
    else {
      notifyAdd(blogId !== undefined);
      navigate('/myBlogs');
    }
  }

  ///use Effect
  useEffect(() => {
    handleBlog();
  }, [handleBlog]);
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
              <button className='btn add-blog-btn'>{blogId === undefined ? "Add Blog" : "Update Blog"} <i className="fa-solid fa-plus"></i></button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
