import React from 'react'
import NotFound_404 from '../../assests/images/404-not-found.png';
export default function NotFound() {
  return (
    <section className='not_found_wraper'>
        <img src={NotFound_404} alt="" className='img-fluid' />
    </section>
  )
}
