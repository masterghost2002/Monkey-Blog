import React from 'react'

export default function Heading(props) {
  return (
    <>
      <div className="heading-container d-flex justify-content-center align-items-center">
        <span className='text-center heading'>{props.content}</span>
      </div>
      <hr className='divider-line'></hr>
    </>
  )
}
