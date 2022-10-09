import React from 'react'
import Avatar from '../../assests/images/avatar-sm.png'
import Copy from '../../assests/images/Copy.png';
import Delete from '../../assests/images/delete-sm-icon.png';
import Edit from '../../assests/images/edit-sm-icon.png';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import Confirm from '../Modals/Confirm';
export default function BlogDetail(props) {
  const image_link = "https://bloggerzone.in/blogadmin/images/63234400_1657257086.jpg";
  const baseServerUrl = "http://localhost:5000/";
  const navigate = useNavigate();
  const downloadModelData = {
    title: "Delete Blog",
    body: "Are you sure want to delete the blog?. Delete action can't be undo.",
    btn_name: "Delete"
  }
  const description = props.blog.description.slice(0, 400);
  let date = new Date(props.blog.created_at);
  let dtFromat = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  date = dtFromat.format(date);
  let userName = localStorage.getItem("userName");

  const handleDelete = (e) => {
    sendDeleteRequest()
      .then(data => console.log(data))
      .catch((err) => console.log(err));
  }
  const handleEdit = () => {
    navigate(`/updateblog/${props.blog._id}`);
  }
  const handleEdit = () => {
    navigate(`/updateblog/${props.blog._id}`);
  }

  const sendDeleteRequest = async () => {
    const res = axios.delete(`${baseServerUrl}blogs/${props.blog._id}`);
    return res.data;
  }

  return (
    <div className="col-lg-5">
      <div className="card blog-card">
        <div className="d-flex justify-content-center img_container">
          <img src={image_link} className="card-img-top img-fluid" alt="fsdfsd" />
        </div>
        <div className="card-body">
          <div className="d-flex card-detail justify-content-between">
            <span><img src={Avatar} alt="" className="img-fluid" />&nbsp; &nbsp;{props.blog.user.name === undefined ? userName : props.blog.user.name}</span>
            <span className='text-muted fw-normal'>{date}</span>
          </div>
          <h5 className="card-title">{props.blog.title}</h5>
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <hr className='divider-line'></hr>
        <div className="card-body d-flex justify-content-between">
          <a href={`/blog/${props.blog._id}`} className="btn btn-viewfull">View Full Blog &rarr;</a>
          <div className='buttons'>
            <CopyToClipboard text={`http://localhost:3000/blog/${props.blog._id}`}>
              <button className="card-link  card-link-btn"><img src={Copy} alt="fdsf" className="img-fluid share" /></button>
            </CopyToClipboard>
            {props.canmodify && <Confirm modelData={downloadModelData} actionFun={handleDelete} icon_path={Delete} />}
            {props.canmodify && <button className="card-link card-link-btn" onClick={handleEdit}><img src={Edit} alt="fdsf" className="img-fluid share" /></button>}
          </div>
        </div>
      </div>
    </div>


  )
}
