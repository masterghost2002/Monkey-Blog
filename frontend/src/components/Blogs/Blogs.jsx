import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
import Heading from './Heading';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authActions } from '../../Store';
export default function Blogs() {
  const baseServerUrl = "https://masterghostblog.herokuapp.com/"
  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();
  const userName = localStorage.getItem('userName');
  // toast
  const showWelcome = useSelector((state) => state.showWelcome);
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
  }, [showWelcome]);


  return (
    <>
      <div className='container-fluid blogs'>
        <Heading content={"Latest Blogs"}></Heading>
        <div className="row justify-content-center">
          {blogs.map((item) => <Blog key={item._id} blog={item} canmodify={false} notificationCopy={notifyCopy}></Blog>)}
        </div>
      </div>
      <ToastContainer />
    </>

  )
}
