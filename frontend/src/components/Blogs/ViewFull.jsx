import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from '../../assests/images/avatar-sm.png'
import Share from '../../assests/images/share-sm-icon.png';
import Download from '../../assests/images/download.png';
import { jsPDF } from "jspdf";
export default function ViewFull() {
    const baseServerUrl = "http://localhost:5000/";
    const param = useParams();
    const blog_id = param.id;
    const [blog, setBlog] = useState({ title: "", description: "", userName: "", date: "" });
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
            const res = await axios.get(`${baseServerUrl}blogs/${blog_id}`).catch((err) => console.log(err));
            const data = await res.data;
            setBlog({
                title: data.blog.title,
                description: data.blog.description,
                userName: data.blog.user.name,
                date: formatDate(data.blog.created_at)
            })
        }
        sendRequestGetBlog();
    }, [blog_id]);

    const generatePDF = () => {
        var doc = new jsPDF("p", "pt", "a4");
        // doc.html(document.querySelector("#content"));
        doc.html(blog.description, {
            callback: function(pdf){
                pdf.save("hello.pdf");
            }
        })
        console.log(doc);
    }
    return (
        <section className='view_full_blog'>
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
                                <p>Hello this is isfjkdsfndkjfnds</p>
                                <p dangerouslySetInnerHTML={{ __html: blog.description }} />
                            </div>
                            <div className="card-body d-flex justify-content-between">
                                <button href="fdsfs" className="card-link  card-link-btn"><img src={Share} alt="fdsf" className="img-fluid share" /></button>
                                <button onClick={generatePDF} className="card-link  card-link-btn"><img src={Download} alt="fdsf" className="img-fluid share" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
