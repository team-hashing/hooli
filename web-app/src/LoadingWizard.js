import React, { useEffect, useState } from 'react';
import './LoadingWizard.css'; // Import your CSS file

function Wizard() {
  const sentences = [
    'Diving into your diary details',
    'Unraveling the threads of your activities',
    'Quantifying your carbon footprints',
    'Pondering over greener alternatives',
    'Tailoring challenges to shrink your eco footprint',
    'Brewing your personalized eco impact report',
    'Polishing suggestions for a greener lifestyle',
    'Unveiling your environmental influence',
    'Weaving your eco-friendly advice',
    'Scrutinizing potential green actions',
    'Assessing your contribution to Mother Earth',
    'Spotting areas for an eco makeover',
    'Designing your journey towards sustainability',
    'Drafting your blueprint for a greener tomorrow',
    'Creating your roadmap to an eco-conscious lifestyle'
  ];

  const [displayedText, setDisplayedText] = useState('');

  const generateSentence = () => {
    const sentence = sentences[Math.floor(Math.random() * sentences.length)];
    const words = sentence.split(' ');
    let currentSentence = '';
    let i = 0;
    const typing = setInterval(() => {
      currentSentence += words[i] + ' ';
      setDisplayedText(currentSentence);
      i++;
      if (i >= words.length) {
        clearInterval(typing);
      }
    }, 200); // Adjust speed of typing here
    return () => clearInterval(typing);
  };

  useEffect(() => {
    generateSentence();
  }, []);

  return (
    <div className="wizard">
      <h2 className='wizard-loading-text' onClick={generateSentence}>{displayedText}</h2>
      <div className="loading">
        <span className="dot dot1">.</span>
        <span className="dot dot2">.</span>
        <span className="dot dot3">.</span>
      </div>
    </div>
  );
}

export default Wizard;