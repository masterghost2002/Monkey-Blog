import { React, useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import Heading from './Heading';
import SkeletonCard from './SkeletonCard';
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

export default function Blogs(props) {
  const userName = localStorage.getItem('userName');
  // store (store/index.js) functions
  const dispatch = useDispatch();
  const showWelcome = useSelector((state) => state.showWelcome); //set show welcome to false after first login

  //props destructure to prevent looping while changing of progress bar
  const progressHandler = props.progressHandler;

  //blogs state, loaderstate
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(true);

  // server requets
  const sendRequest = async () => {
    progressHandler(27);
    const res = await axios.get(`${baseServerUrl}blogs/`)
      .then((response) => {
        progressHandler(87);
        return response;
      })
      .catch(err => console.log(err));
    const data = await res.data;
    setLoader(false);
    progressHandler(100);
    return data; // return blogs data 
  }

  // use effect
  useEffect(() => {
    sendRequest().then((data) => {
      setBlogs(data.blogs);
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWelcome, dispatch, userName]);


  return (
    <>
      <div className='container-fluid blogs'>
        <Heading content={"Latest Blogs"}></Heading>
        {loader?<div className="row justify-content-center">{<><SkeletonCard/><SkeletonCard/></>}</div>:<div className="row justify-content-center">
          {blogs.map((item) => <BlogCard key={item._id} blog={item} canmodify={false} notificationCopy={notifyCopy}></BlogCard>)}
        </div>}
      </div>
      <ToastContainer />
    </>

  )
}
