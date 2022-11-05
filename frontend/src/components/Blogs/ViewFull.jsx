import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../../assests/images/avatar-sm.png'
import { jsPDF } from "jspdf";
import CopyToClipboard from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
// as we are injection external html so, its good to purify it to prevent exteranl html attack
import ViewFullSkeleton from './ViewFullSkeleton';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { notifyCopy } from '../Toastify/ToastNotifications';
import { GET_BLOG_BY_ID } from '../BackendResponses/backendRequest';
export default function ViewFull(props) {

    //store
    const themeSide = useSelector((state) => state.themeSide);

    //props destructure to prevent looping while changing of progress bar
    const progressHandler = props.progressHandler;
    const [loader, setLoader] = useState(true);
    //blog state
    const [blog, setBlog] = useState({ title: "", description: "", userName: "", date: "", _id: "" });

    //router dom
    const navigate = useNavigate();
    const param = useParams();
    const blog_id = param.id;

    //blog description
    const description = blog.description;
    const descriptionDark = description;
    // console.log(descriptionDark);

    //model and data
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const downloadModelData = {
        title: "Download as PDF",
        body: "Currently this Feature is in BETA Stage downloaded file may be not as same as blog!",
        btn_name: "Download",
        btn_color: "success"
    }

    //time format 
    const formatDate = (created_at) => {
        let date = new Date(created_at);
        let dtFromat = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        date = dtFromat.format(date);
        return date;
    }

    //server request to get blog
    const sendRequestGetBlog = useCallback(async () => {
        progressHandler(27);
        const response = await GET_BLOG_BY_ID(blog_id);
        if (response.status === 200) {
            const data = await response.data;
            setBlog({
                title: data.blog.title,
                description: data.blog.description,
                userName: data.blog.user.name,
                date: formatDate(data.blog.created_at),
                _id: data.blog._id
            });
            setLoader(false);
            progressHandler(100);
        }
        else {
            progressHandler(100);
            navigate("/notfound");
        }

    }, [blog_id, navigate, progressHandler]);
    useEffect(() => {
        sendRequestGetBlog();
    }, [sendRequestGetBlog]);

    const generatePDF = () => {
        var doc = new jsPDF("p", "pt", "a4");
        doc.html(document.querySelector("#content"), {
            callback: function (pdf) {
                pdf.save(`${blog.title}.pdf`);
            }
        });
    }
    return (
        <>
            {loader ? <ViewFullSkeleton /> : < section className='view_full_blog' >
                <div className="container-fluid blogs">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className={`card card-full card-full-${themeSide}`} >
                                <div className="card-detail card-header row">
                                    <div className="col-lg-6">
                                        <span><img src={Avatar} alt="" className="img-fluid" />&nbsp; &nbsp;{blog.userName}</span>
                                    </div>
                                    <div className="col-lg-6 d-flex justify-content-end">
                                        <span>
                                            <i className="bi bi-calendar3"></i> <span className='fw-normal'>&nbsp;{blog.date}</span>
                                        </span>
                                    </div>
                                </div>
                                <div id="content">
                                    <div className="card-body card-full-body">
                                        <h5 className="card-title">Title:&nbsp;&nbsp;{blog.title}</h5>
                                        <p className='p-body' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(descriptionDark) }} />
                                    </div>
                                    <hr></hr>
                                    <div className="card-body d-flex justify-content-between">
                                        <CopyToClipboard text={`https://monkey-app.netlify.app/blog/${blog._id}`}>
                                            <button className="card-link  card-link-btn blog-btns" title='copy-link' onClick={notifyCopy}><i className="fa-solid fa-share fs-4"></i></button>
                                        </CopyToClipboard>
                                        <button type="button" className="card-link card-link-btn blog-btns" onClick={handleShow}>
                                            <i className="fa-regular fa-file-pdf fs-4"></i>
                                        </button>
                                        <Modal show={show} onHide={handleClose} className={`modal-${themeSide}`}>
                                            <Modal.Header closeButton className={`modal-header-${themeSide}`}>
                                                <Modal.Title>{downloadModelData.title}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className={`modal-body-${themeSide}`} >{downloadModelData.body}</Modal.Body>
                                            <Modal.Footer className={`modal-footer-${themeSide}`}>
                                                <Button variant="success" onClick={generatePDF}>
                                                    {downloadModelData.btn_name}
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >}
        </>

    );
}
