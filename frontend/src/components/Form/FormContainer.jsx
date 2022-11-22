import React, {Children, cloneElement, isValidElement} from "react";
import PropTypes from 'prop-types';
export default function FormContainer(props) {
    return (
        <form  onSubmit = {props.handleSubmit} className="form-container">
            {Children.map(props.children, (child)=>{
                if(!isValidElement(child)) return null;
                return cloneElement(child, {
                    ...child.props
                })
            })}
        </form>
    )
};
FormContainer.propTypes = {
    handleSubmit: PropTypes.func
}

