import React, {useState} from 'react'
import PropTypes from 'prop-types';
export default function PasswordInput(props) {
    const [viewPassword, setViewPassword] = useState(false);

    return (
        <div className="input-group mb-4">
            <input disabled={props.disabled} type={viewPassword ? "text" : "password"} className={`form-control p-3 ${props.style} `} id={props.id} placeholder={props.placeholder} aria-label="Recipient's username" aria-describedby="button-addon2" onChange={props.onChange} value = {props.defaultValue} name={props.name} />
            {props.viewButton && <button className="btn btn-show-password" type="button" id="button-addon2" onClick={() => setViewPassword((prevState)=>!prevState)} title={viewPassword ? "hide-password" : "view-password"}><i className={`bi bi-eye${viewPassword ? "-slash-fill" : "-fill"}`}></i></button>}
        </div>
    )
};
PasswordInput.propTypes = {
    name: PropTypes.string,
    viewButton: PropTypes.bool,
    disabled: PropTypes.bool
  };
PasswordInput.defaultProps = {
    id: 'floatingPassword',
    viewButton: true,
    disabled: false
  };