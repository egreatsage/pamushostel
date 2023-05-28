import React, { useState } from 'react';
import './Alert.css'; // import custom styles for the alert

const Alert = ({ message, type }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return showAlert ? (
    <div className={`alert ${type}`}>
      <span className="message">{message}</span>
      <button className="close" onClick={handleCloseAlert}>
        &times;
      </button>
    </div>
  ) : null;
};

export default Alert;
