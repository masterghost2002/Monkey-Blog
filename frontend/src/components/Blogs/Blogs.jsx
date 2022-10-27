import { React, useCallback, useEffect, useState } from 'react';
import { authActions } from '../../Store';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// components
import {notifyCopy, notifyWelcome} from '../Toastify/ToastNotifications';
import BlogCard from './BlogCard';
import Heading from './Heading';
import SkeletonCard from './SkeletonCard';
import AddBlogFloat from '../Modals/AddBlogFloat';

const baseServerUrl = "https://masterghostblog.herokuapp.com/";
// const baseServerUrl = "http://localhost:5000/";

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
  const sendRequest = useCallback(async () => {
    progressHandler(27);
    const res = await axios.get(`${baseServerUrl}blogs/`)
      .then((response) => {
        progressHandler(87);
        return response;
      })
      .catch(err => console.log(err));
    const data = await res.data;
    await setLoader(false);
    await progressHandler(100);
    return data; // return blogs data 
  }, [progressHandler])


  // use effect
  useEffect(() => {
    sendRequest().then((data) => {
      setBlogs(data.blogs);
    }).catch((err)=>console.log(err));
    if(showWelcome === true){
      notifyWelcome(userName);
      dispatch(authActions.setShowWelcome());
    }
  }, [sendRequest, showWelcome, dispatch, userName]);

  return (
    <>
      <div className='container-fluid blogs'>
        <Heading content={"Latest Blogs"}></Heading>
        {loader ? <div className="row justify-content-center">{<><SkeletonCard /><SkeletonCard /></>}</div> : <div className="row justify-content-center">
          {blogs.map((item) => <BlogCard key={item._id} blog={item} canmodify={false} notificationCopy={notifyCopy}></BlogCard>)}
        </div>}
      </div>
      {!loader && <AddBlogFloat />}
    </>

  )
}
