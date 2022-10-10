import React from 'react'

export default function Confirm(props) {
    return (
        <>
            <button type="button" className="card-link card-link-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src={props.icon_path} alt="fdsf" className="img-fluid share" />
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <button onClick={props.actionFun} type="button" className={`btn btn-${props.modelData.btn_color}`} data-bs-dismiss="modal">
                                {props.modelData.btn_name}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
