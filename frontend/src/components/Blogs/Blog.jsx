import React, { useState } from 'react'
import Avatar from '../../assests/images/avatar-sm.png'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function BlogDetail(props) {

  // backend realted and navigation
  let userName = localStorage.getItem("userName");
  const image_link = "https://bloggerzone.in/blogadmin/images/63234400_1657257086.jpg";
  const baseServerUrl = "https://masterghostblog.herokuapp.com/";
  const navigate = useNavigate();



  // modal states and function
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* as the noraml description is in the form of html so, sometimes the html tags are larger than the 300 word
    which lead to the empty description in blog section.So, convert it to plain text using regex
  */
  const htmlString = props.blog.description;
  const descriptionSM = htmlString.replace(/<[^>]+>/g, '').slice(0, 300);

  // date time format
  let date = new Date(props.blog.created_at);
  let dtFromat = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  date = dtFromat.format(date);

  // edit delete function and request
  const handleDelete = () => {
    setShow(false);
    sendDeleteRequest().then(() => {
      props.onDelete();
      props.notificationDelete();
    }).catch((err) => console.log(err));
  }
  const handleEdit = () => {
    navigate(`/updateblog/${props.blog._id}`);
  }
  const sendDeleteRequest = async () => {
    const res = await axios.delete(`${baseServerUrl}blogs/${props.blog._id}`);
    return res.data;
  }

  return (
    <>
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
                <span><i className="bi bi-calendar3"></i></span><span className='text-muted fw-normal'>&nbsp; {date}</span>
              </div>
            </div>
            <h5 className="card-title">{props.blog.title}</h5>
            <p>{descriptionSM}...</p>
          </div>
          <hr className='divider-line'></hr>
          <div className="card-body row">
            <div className="col-lg-6 mt-lg-3 ">
              <NavLink className="btn btn-viewfull" aria-current="page" to={`/blog/${props.blog._id}`}>View Full Blog &nbsp;<i className="bi bi-eye"></i></NavLink>
            </div>
            <div className={`col-lg-6 mt-3 d-flex justify-content-${props.canmodify ? "between" : "end"}`}>
              <CopyToClipboard text={`https://monkey-app.netlify.app/blog/${props.blog._id}`}>
                <button onClick={props.notificationCopy} className="card-link  card-link-btn blog-btns"><i className="bi bi-link-45deg fs-4"></i></button>
              </CopyToClipboard>
              {props.canmodify && <button className="card-link card-link-btn blog-btns" onClick={handleEdit}><i className="bi bi-pencil-square fs-4"></i></button>}
              {/* delete confirm modal */}
              {props.canmodify && <>
                <button className="card-link card-link-btn blog-btns" onClick={handleShow}>
                  <i className="bi bi-trash fs-4 "></i>
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Blog</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure want to delete the blog?Delete action can't be undo.</Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>}

            </div>
          </div>
        </div>
      </div>
    </>

  )
}
