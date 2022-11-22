import React from 'react'

export default function SubHeading(props) {
    return (
        <div className="fw-bold mb-4">{props.subHeading.primaryHeading}
            <button className="text-primary fw-bold btn-auth" type='button' onClick={() => props.changeSubHeading()}> {props.subHeading.secondaryHeading}</button>
        </div>
  )
}
