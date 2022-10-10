import React from 'react'
import { NavLink} from 'react-router-dom'
export default function NoBlog() {
  return (
    <div className='no_blog container-fluid mt-4'>
        <span className='fs-3 fw-bold text-muted d-flex justify-content-center'>Opps!</span><br></br>
        <span className="fs-4 fw-bold text-muted d-flex justify-content-center">Add Your first Blog</span>
        <div className='d-flex justify-content-center mt-4'>
            <NavLink className="btn btn-add_blog" to={'/addBlog'}>Add Blog</NavLink>
        </div>
    </div>
  )
}
