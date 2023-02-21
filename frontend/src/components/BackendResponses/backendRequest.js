import axios from "axios";
const AUTH_ACCESS_TOKEN = () => localStorage.getItem("auth_access_token");
// user requests
const BACKEND_URL = ()=>"https://doubtful-life-jacket-slug.cyclic.app/";
// const BACKEND_URL = ()=>"http://localhost:5000/";

// user realted request start
// auth token is used for auto login
const AUTH_TOKEN = async () => {
    const reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN()}` } });
    const response = await reqInstance.post(`${BACKEND_URL()}user/verify_auth`)
        .then(response => response)
        .catch(error => error.response);
    return response;
}
const LOGIN_REQUEST = async (userInfo) => {
    const response = await axios.post(`${BACKEND_URL()}user/login`, {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password
    }).then(response => response).catch(error => error.response);
    return response;
}

const SIGNUP_REQUEST = async (userInfo) => {
    const response = await axios.post(`${BACKEND_URL()}user/signup/sendotp`, {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password
    }).then(response => response).catch(error => error.response);
    return response;
}
const SIGNUP_OTP_VERIFY = async (requestData) => {
    const response = await axios.post(`${BACKEND_URL()}user/signup/verifyuser`, {
        email: requestData.email,
        Otp: requestData.OTP
    }).then(response=>response).catch(error=>error.response);
    return response;
}
const FORGOT_PASSWORD_OTP_VERIFY = async (requestData) => {
    const response = await axios.post(`${BACKEND_URL()}user/forgotpassword/verify`, {
        email: requestData.email,
        Otp: requestData.OTP
    }).then(response=>response).catch(error=>error.response);
    return response;
}
const FORGOT_PASSWORD_OTP_REQUEST = async (requestData)=>{
    const response = await axios.post(`${BACKEND_URL()}user/forgotpassword`, {
        email: requestData.email,
        password: requestData.password
      }).then(response=>response).catch(error=>error.response);
    return response;
}
const UPDATE_THEME = async (requestData)=>{
    let reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN()}` } });
    const response = await reqInstance.put(`${BACKEND_URL()}user/update`, {
        themeSide: requestData.themeSide
    }).then(response=>response).catch(error=>error.response);
    return response;
}

//  user related request end


// blog realted requests
const GET_ALL_BLOGS = async () => {
    let reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN()}` } });
    const response = await reqInstance.get(`${BACKEND_URL()}blogs/`)
        .then((response) => {
            return response;
        })
        .catch(error => error.response);
    return response;
};
const GET_USER_BLOGS = async () => {
    let reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN()}` } });
    const response = await reqInstance.get(`${BACKEND_URL()}blogs/user`)
        .then(response => response)
        .catch(error => error.response);
    return response;

}
const DELETE_BLOG_BY_ID = async (blogId) => {
    let reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN()}` } });
    const response = await reqInstance.delete(`${BACKEND_URL()}blogs/${blogId}`)
        .then(response => response)
        .catch(error => error.response);
    return response;
}
const REQUEST_ADD_BLOG = async (blogInfo) => {
    let reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN()}` } });
    const response = await reqInstance.post(`${BACKEND_URL()}blogs/add`, {
        title: blogInfo.title,
        description: blogInfo.description,
    }).then(response => response)
        .catch(error => error.response);
    return response;
}
const UPDATE_BLOG = async (blogInfo) => {
    let reqInstance = axios.create({ headers: { Authorization: `Bearer ${AUTH_ACCESS_TOKEN()}` } });
    const response = await reqInstance.put(`${BACKEND_URL()}blogs/update/${blogInfo.blogId}`, {
        title: blogInfo.title,
        description: blogInfo.description,
        user: blogInfo.userId
    }).then(response => response)
        .catch(error => error.response);
    return response;
}
const GET_BLOG_BY_ID = async (blogId) => {
    const response = await axios.get(`${BACKEND_URL()}blogs/${blogId}`)
        .then(response => response)
        .catch(error => error);
    return response;
}

const SEND_MAIL = async (mailData)=>{
    const response = await axios.post(`${BACKEND_URL()}contactus`, {
        name: mailData.name,
        email: mailData.email,
        message: mailData.message
    }).catch(err => err.response);
    return response;
}
export { GET_ALL_BLOGS, GET_USER_BLOGS, DELETE_BLOG_BY_ID, REQUEST_ADD_BLOG, UPDATE_BLOG, GET_BLOG_BY_ID, AUTH_TOKEN, LOGIN_REQUEST, SIGNUP_REQUEST,SIGNUP_OTP_VERIFY, FORGOT_PASSWORD_OTP_VERIFY,UPDATE_THEME,FORGOT_PASSWORD_OTP_REQUEST, SEND_MAIL};