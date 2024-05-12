import React from 'react';
import './PromoWizard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function PromoWizard() {

  return (
    <div className="challenges-wizard">
      <h1 className="title">DOWNLOAD NOW!</h1>
      <h2 className="subtitle">Download the app to get started on your eco-friendly journey!</h2>
      <div className="promo-button-container">
        <div className="promo-button">
          <p className="promo-text">Download .apk </p>
          <FontAwesomeIcon icon={faDownload} size='x' />
        </div>
      </div>
    </div>
  );
}

export default PromoWizard;