import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ isShowing, hide, header = null,closable, children }) => {
    return isShowing
        ? ReactDOM.createPortal(
            <React.Fragment>
                <div  className={"modal  fade show noselect"}>
                    <div className={"modal-dialog modal-dialog-centered"}>
                        <div className={"modal-content"}>
                            <div className={closable ? "modal-header" : "d-none"}>
                                <h5 className={"modal-title"}>{header}</h5>
                                <button onClick={hide} type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
        : null
}

export default Modal
