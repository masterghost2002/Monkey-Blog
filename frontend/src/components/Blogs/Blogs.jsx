import { React, useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import Heading from './Heading';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authActions } from '../../Store';


const baseServerUrl = "https://masterghostblog.herokuapp.com/";
// const baseServerUrl = "http://localhost:5000/";

// toast
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

export default function Blogs() {
  const userName = localStorage.getItem('userName');
  // store (store/index.js) functions
  const dispatch = useDispatch();
  const showWelcome = useSelector((state) => state.showWelcome); //set show welcome to false after first login


  //blogs state
  const [blogs, setBlogs] = useState([]);



  // server requets
  const sendRequest = async () => {
    const res = await axios.get(`${baseServerUrl}blogs/`)
      .then((response) => response)
      .catch(err => console.log(err));
    const data = await res.data;
    return data; // return blogs data 
  }

  // use effect
  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs));
    const notifyWelcome = () => {
      toast(`Welcome ${userName} ✌️`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(authActions.setShowWelcome());
    };
    if (showWelcome === true)
      notifyWelcome();
  }, [showWelcome, dispatch, userName]);


  return (
    <>
      <div className='container-fluid blogs'>
        <Heading content={"Latest Blogs"}></Heading>
        <div className="row justify-content-center">
          {blogs.map((item) => <BlogCard key={item._id} blog={item} canmodify={false} notificationCopy={notifyCopy}></BlogCard>)}
        </div>
      </div>
      <ToastContainer />
    </>

  )
}
