import React from 'react'

export default function FormHeading(props) {
    return (
        <div className="d-flex heading-container justify-content-center align-items-centers">
            <span className='text-center heading'>{props.heading}</span>
        </div>
    )
}
