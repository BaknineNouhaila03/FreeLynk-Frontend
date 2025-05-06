"use client"
import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, onConfirm, title, actionType }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <h2 style={{fontWeight:"400",fontSize:"20px"}}>
            Are you sure you want to <span className="highlight">{actionType}</span> your account ?
          </h2>
          <div className="modal-buttons">
            <button className="confirm-button" onClick={onConfirm}>
              Confirm
            </button>
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;