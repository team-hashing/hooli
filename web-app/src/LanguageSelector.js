import React, { useContext } from 'react';
import LanguageContext from './LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="language-selector">
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en-US">🇺🇸</option>
        <option value="fr-FR">🇫🇷</option>
        <option value="es-ES">🇪🇸</option>
        {/* add more options as needed */}
      </select>
    </div>
  );
};

export default LanguageSelector;