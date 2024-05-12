import React from 'react';
import './ChallengesWizard.css';

function ChallengesWizard({ challenges }) {

    console.log(challenges);
  return (
    <div className="challenges-wizard">
      <h1 className="title">FUTURE CHALLENGES</h1>
        <h2 className="subtitle">Here are some challenges you can take on to become more eco-friendly:</h2>
        <div className="challenges-list">
          {challenges.map((challenge, index) => (
            <div key={index} className="challenge">
              <h3 className='challenge-header'>{challenge.challenge}</h3>
              <p  className='challenge-message'>{challenge.challenge_description}</p>
              <p  className={`challenge-difficulty`}>
                {Array.from({ length: Math.abs(challenge.challenge_difficulty) }, (_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </p>
            </div>
          ))}
          </div>
    </div>
  );
}

export default ChallengesWizard;