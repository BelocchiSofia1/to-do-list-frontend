import React, { useState } from 'react';

const Card = ({ id, title, description, status: initialStatus, onDelete }) => {
    
  const [status, setStatus] = useState(initialStatus);

  const toggleStatus = () => {
    setStatus(prevStatus => (prevStatus === 'PENDING' ? 'COMPLETED' : 'PENDING'));
  };

  const handleDelete = () => {
    if (typeof onDelete === 'function') {
      onDelete(id);
    } else {
      console.error('onDelete is not a function');
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-muted">{status}</small>
        </p>
        <button className="btn btn-secondary" onClick={toggleStatus}>
          {status === 'PENDING' ? 'Completed' : 'Pending'}
        </button>
        <button className="btn btn-danger ml-2" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Card;
