import axios from "axios";
import { notifyError } from "../Toastify/ToastNotifications";
const baseServerUrl = () => "https://masterghostblog.herokuapp.com/";
// const baseServerUrl = () => "http://localhost:5000/";
const AUTH_ACCESS_TOKEN = () => localStorage.getItem("auth_access_token");

// user requests
const LOGIN_REQUEST = async (userInfo) => {
    const response = await axios.post(`${baseServerUrl()}user/login`, {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password
    }).then(response => response).catch(error => error.response);
    return response;
}

const SIGNUP_REQUEST = async (userInfo) => {
    const response = await axios.post(`${baseServerUrl()}user/signup/sendotp`, {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password
    }).then(response => response).catch(error => error.response);
    return response;
}
const SIGNUP_OTP_VERIFY = async (requestData) => {
    const response = await axios.post(`${baseServerUrl()}user/signup/verifyuser`, {
        email: requestData.email,
        Otp: requestData.OTP
    }).then(response=>response).catch(error=>error.response);
    return response;
}
const FORGOT_PASSWORD_OTP_VERIFY = async (requestData) => {
    const response = await axios.post(`${baseServerUrl()}user/forgotpassword/verify`, {
        email: requestData.email,
        Otp: requestData.OTP
    }).then(response=>response).catch(error=>error.response);
    return response;
}
const FORGOT_PASSWORD_OTP_REQUEST = async (requestData)=>{
    const response = await axios.post(`${baseServerUrl()}user/forgotpassword`, {
        email: requestData.email,
        password: requestData.password
      }).then(response=>response).catch(error=>error.response);
    return response;
}
const UPDATE_THEME = async (requestData)=>{
    const response = await axios.put(`${baseServerUrl()}user/update`, {
        userId: requestData.userId,
        themeSide: requestData.themeSide
    }).then(response=>response).catch(error=>error.response);
    return response;
}
// blog realted requests
const GET_ALL_BLOGS = async () => {
    const response = await axios.get(`${baseServerUrl()}blogs/`)
        .then((response) => {
            return response;
        })
        .catch(error => notifyError(error.response.data));
    return response;
};
const GET_USER_BLOGS = async (userId) => {
    const response = await axios.get(`${baseServerUrl()}blogs/user/${userId}`)
        .then(response => response)
        .catch(error => notifyError(error.response.data));
    return response;

}
const DELETE_BLOG_BY_ID = async (blogId) => {
    const response = await axios.delete(`${baseServerUrl()}blogs/${blogId}`)
        .then(response => response)
        .catch(error => error);
    return response;
}
const REQUEST_ADD_BLOG = async (blogInfo) => {
    const response = await axios.post(`${baseServerUrl()}blogs/add`, {
        title: blogInfo.title,
        description: blogInfo.description,
        user: blogInfo.userId
    }).then(response => response)
        .catch(error => error.response);
    return response;
}
const UPDATE_BLOG = async (blogInfo) => {
    let reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN()}` } });
    const response = await reqInstance.put(`${baseServerUrl()}blogs/update/${blogInfo.blogId}`, {
        title: blogInfo.title,
        description: blogInfo.description,
        user: blogInfo.userId
    }).then(response => response)
        .catch(error => error.response);
    return response;
}
const GET_BLOG_BY_ID = async (blogId) => {
    const response = await axios.get(`${baseServerUrl()}blogs/${blogId}`)
        .then(response => response)
        .catch(error => error);

    return response;
}
const AUTH_TOKEN = async () => {
    const reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN()}` } });
    const response = await reqInstance.post(`${baseServerUrl()}user/verify_auth`)
        .then(response => response)
        .catch(error => error.response);
    return response;
}

const SEND_MAIL = async (mailData)=>{
    const response = await axios.post(`${baseServerUrl()}contactus`, {
        name: mailData.name,
        email: mailData.email,
        subject: mailData.subject,
        message: mailData.message
    }).catch(err => err.response);
    return response;
}
export { GET_ALL_BLOGS, GET_USER_BLOGS, DELETE_BLOG_BY_ID, REQUEST_ADD_BLOG, UPDATE_BLOG, GET_BLOG_BY_ID, AUTH_TOKEN, LOGIN_REQUEST, SIGNUP_REQUEST,SIGNUP_OTP_VERIFY, FORGOT_PASSWORD_OTP_VERIFY,UPDATE_THEME,FORGOT_PASSWORD_OTP_REQUEST, SEND_MAIL};