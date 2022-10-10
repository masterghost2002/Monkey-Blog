import React from 'react'
import Avatar from '../../assests/images/avatar-sm.png'
import Copy from '../../assests/images/Copy.png';
import Delete from '../../assests/images/delete-sm-icon.png';
import Edit from '../../assests/images/edit-sm-icon.png';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import Confirm from '../Modals/Confirm';
export default function BlogDetail(props) {
  const image_link = "https://bloggerzone.in/blogadmin/images/63234400_1657257086.jpg";
  const baseServerUrl = "https://masterghostblog.herokuapp.com/";
  const navigate = useNavigate();
  const downloadModelData = {
    title: "Delete Blog",
    body: "Are you sure want to delete the blog?. Delete action can't be undo.",
    btn_name: "Delete",
    btn_color: "danger"
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
    sendDeleteRequest().catch((err) => console.log(err));
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
          <div className=" row card-detail">
            <div className="col-lg-6">
              <span><img src={Avatar} alt="" className="img-fluid" />&nbsp; &nbsp;{props.blog.user.name === undefined ? userName : props.blog.user.name}</span>
            </div>
            <div className="col-lg-6 d-flex justify-content-end">
              <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg></span><span className='text-muted fw-normal'>&nbsp; {date}</span>
            </div>
          </div>
          <h5 className="card-title">{props.blog.title}</h5>
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <hr className='divider-line'></hr>
        <div className="card-body row">
          <div className="col-lg-6 mt-lg-3 ">
            <NavLink className="btn btn-viewfull" aria-current="page" to={`/blog/${props.blog._id}`}>View Full Blog &rarr;</NavLink>
          </div>
          <div className={`col-lg-6 mt-3 d-flex justify-content-${props.canmodify ? "between" : "end"}`}>
            <CopyToClipboard text={`https://monkey-app.netlify.app/blog/${props.blog._id}`}>
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
