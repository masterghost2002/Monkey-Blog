import React from 'react'
export default function Confirm(props) {
    // console.log(props.actionFun);
    return (
        <>
           
            <button type="button" className="card-link card-link-btn blog-btns" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i className="bi bi-file-earmark-arrow-down-fill fs-4"></i>
            </button>
            <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="exampleModalLabel">
                                {props.modelData.title}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {props.modelData.body}
                        </div>
                        <div className="modal-footer">
                            <button  type="button" onClick={props.actionFun} className={`btn btn-${props.modelData.btn_color}`} data-bs-dismiss="modal">
                                {props.modelData.btn_name}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
