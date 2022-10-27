// import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const userName = localStorage.getItem('userName');
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
const notifyDelete = () => toast.success('Delete Success', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
});
const notifyAdd = (isUpdate) => toast.success(`${!isUpdate ? "Blog Added" : "Blog Update Success"}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
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
};
export { notifyCopy, notifyDelete, notifyAdd, notifyWelcome };