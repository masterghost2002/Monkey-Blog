import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios  from 'axios';
import Avatar from '../../assests/images/avatar-sm.png'
import Copy from '../../assests/images/Copy.png';
import Download from '../../assests/images/download.png';
import { jsPDF } from "jspdf";
import CopyToClipboard from 'react-copy-to-clipboard';
import Confirm from '../Modals/Confirm';
import { useNavigate } from 'react-router-dom';

export default function ViewFull() {
    const navigate = useNavigate();
    const baseServerUrl = "http://localhost:5000/";
    const param = useParams();
    const blog_id = param.id;
    const [blog, setBlog] = useState({ title: "", description: "", userName: "", date: "", _id: "" });
    const downloadModelData = {
        title: "Download as PDF",
        body: "Currently this Feature is in BETA Stage downloaded file may be not as same as blog!",
        btn_name: "Download"
    }
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

    useEffect(() => {
        const sendRequestGetBlog = async () => {
            console.log("In get blog");
            const res = await axios.get(`${baseServerUrl}blogs/${blog_id}`).catch(function (error) {
                if (error.response) 
                  navigate("/notfound");
                else if (error.request) 
                  console.log(error.request);
                else 
                  console.log('Error', error.message);
              });
            const data = await res.data;
            setBlog({
                title: data.blog.title,
                description: data.blog.description,
                userName: data.blog.user.name,
                date: formatDate(data.blog.created_at),
                _id: data.blog._id
            })
        }
        sendRequestGetBlog();
    }, [blog_id, navigate]);

    const generatePDF = () => {
        var doc = new jsPDF("p", "pt", "a4");
        doc.html(document.querySelector("#content"), {
            callback: function (pdf) {
                pdf.save(`${blog.title}.pdf`);
            }
        });
    }
    return (
        <section className='view_full_blog'>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card card-full" >
                            <div className="d-flex card-header justify-content-between">
                                <span className='fw-bold fs-4'><img src={Avatar} alt="" className="img-fluid" />&nbsp; &nbsp;{blog.userName}</span>
                                <span className='text-muted fw-normal'>{blog.date}</span>
                            </div>
                            <div id="content">
                                <div className="card-body card-full-body">
                                    <h5 className="card-title">Title:&nbsp;&nbsp;{blog.title}</h5>
                                    <p dangerouslySetInnerHTML={{ __html: blog.description }} />
                                </div>
                                <hr></hr>
                                <div className="card-body d-flex justify-content-between">
                                    <CopyToClipboard text={`http://localhost:3000/blog/${blog._id}`}>
                                        <button className="card-link  card-link-btn"><img src={Copy} alt="fdsf" className="img-fluid share" /></button>
                                    </CopyToClipboard>
                                    <Confirm modelData={downloadModelData} actionFun={generatePDF} icon_path = {Download} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    )
}
