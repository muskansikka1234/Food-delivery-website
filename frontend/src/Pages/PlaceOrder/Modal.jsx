import React from 'react';
import './Modal.css'; // Add styles for the modal

const Modal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Order Status</h2>
                <p>{message}</p>
                <button onClick={onClose} className="modal-close-btn">Close</button>
            </div>
        </div>
    );
};

export default Modal;
