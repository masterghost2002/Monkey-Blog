import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Alert() {
    return (
        <div>
            <span>{toast("So easy")}</span>
            <ToastContainer />
        </div>
    );
}
export default Alert;