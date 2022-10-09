import React from 'react'
import NotFound_404 from '../../assests/images/404-not-found.png';
export default function NotFound() {
  return (
    <section className='not_found'>
        <div className="d-flex not_found_container">
            <img src={NotFound_404} alt="notdound" className="img-fluid not-found-img" />
        </div>
    </section>
  )
}
