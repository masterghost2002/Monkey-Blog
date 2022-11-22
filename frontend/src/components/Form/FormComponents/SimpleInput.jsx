import PropTypes from 'prop-types';
export default function SimpleInput(props) {
    return (
       <div className="form-floating mb-3">
            <input type={props.type} disabled={props.disabled} className={`form-control ${props.style}`} id={`floatingInput exampleFormControlInput1 ${props.id}`} placeholder={props.placeholder} onChange={props.onChange} value={props.defaultValue} name={props.name} />
            <label htmlFor="floatingInput">{props.label}</label>
        </div>
    )
};
SimpleInput.propTypes = {
    name: PropTypes.string,
    defaultValue: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    style: PropTypes.string
  };
SimpleInput.defaultProps = {
    name: 'name',
    label: 'simple input',
    type: 'text',
    disabled: false
};
