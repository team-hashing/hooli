import React, { useState } from 'react';
import './App.css';
import PromptPage from './PromptPage';
import LanguageSelector from './LanguageSelector';
import LanguageContext from './LanguageContext';

function App() {
  const [language, setLanguage] = useState('en-US');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className='hooli' style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '2em', zIndex: 1000 }}>
        hooli
      </div>
      <PromptPage />
      <LanguageSelector />
    </LanguageContext.Provider>
  );
}

export default App;
