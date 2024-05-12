import React from 'react';
import './ResponseWizard.css';

function ResponseWizard({ message }) {
  return (
    <div className="response-wizard">
      <h1 className="title">YOUR ECO-REVIEW IS READY!</h1>
      <p className="message">{message}</p>
    </div>
  );
}

export default ResponseWizard;