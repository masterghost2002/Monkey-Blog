import React from 'react'
import PropTypes from 'prop-types'
export default function TextArea(props) {
    return (
        <div className="mb-1">
            <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3" >{props.label}</label>
            <textarea className="form-control" id={`exampleFormControlTextarea1 ${props.id}`} rows={props.row} onChange={props.onChange} value={props.defaultValue} name={props.name}></textarea>
        </div>
    )
};
TextArea.propTypes = {
    name: PropTypes.string,
    defaultValue: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    row: PropTypes.number
  };
TextArea.defaultProps = {
    name: 'name',
    label: 'simple input',
    type: 'text',
    row: 4
};
