import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import LanguageContext from './LanguageContext';
import Wizard from './Wizard';

import './PromptPage.css';

const PromptPage = () => {
  const { language } = useContext(LanguageContext);
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.interimResults = true;
      recognition.lang = language;
      let finalTranscript = '';
      let interimTranscript = '';
      recognition.onresult = (event) => {
        interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setText(finalTranscript + ' ' + interimTranscript);
      };
      setSpeechRecognition(recognition);
    }
  }, [language]);

  const startRecording = () => {
    if (speechRecognition) {
      setIsRecording(true);
      speechRecognition.start();
    }
  };

  const stopRecording = () => {
    if (speechRecognition) {
      setIsRecording(false);
      speechRecognition.stop();
    }
  };


  const handleButtonClick = () => {
    generateContent();
    setIsButtonClicked(true);
    setTimeout(() => {
      setShowWizard(true);
    }, 700);
  };

  const generateContent = async () => {
    console.log('Generating content...');
    setTimeout(() => {
    }, 500);
    
    setText('');
  };

  return (
    <div>
    <div className={`${!showWizard ? 'container' : 'containerv2'}`}>
      <div className={`text-container ${isButtonClicked ? 'full-width' : ''}`}>
        {showWizard ? (
          <></> 
        ):(
          <>
            <h1 className='start-text'>Please explain your day</h1>
            <h1 className='start-text'>to become more</h1>
            <h1 className='start-text'>eco-friendly...</h1>
          </>
        )}
      </div>
        <div className={`input-container ${isButtonClicked ? 'no-width' : ''}`}>
          <div className="textarea-container">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text"
            />
            <button 
              className="record-button" 
              onMouseDown={startRecording} 
              onMouseUp={stopRecording}
              onTouchStart={startRecording} 
              onTouchEnd={stopRecording}
            >
              <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} />
            </button>
          </div>
          <div className="send-container">
            <button className='send-button' onClick={handleButtonClick}>ECO-Review</button>
          </div>
        </div>
    </div>
    {showWizard ? (<Wizard inputText={text} />) : ('')}
    </div>
  );
};

export default PromptPage;