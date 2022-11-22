import React from 'react'
import PropTypes from 'prop-types';
export default function Button(props) {
  return (
    <button className="btn submit_btn  my-2" type={props.type} onClick={props.onClick} title={props.title}>{props.btn_name} &nbsp;<i className={props.icon}></i> </button>
  )
};
Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  btn_name:PropTypes.string,
  icon:PropTypes.string
};
Button.defaultProps = {
  type: 'submit',
  title: 'button'
};
