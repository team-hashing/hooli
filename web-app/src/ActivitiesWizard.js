import React from 'react';
import './ActivitiesWizard.css';

function ActivitiesWizard({ activities }) {

    console.log(activities);
  return (
    <div className="activities-wizard">
      <h1 className="title">YOUR ACTIVITIES</h1>
        <h2 className="subtitle">Here are some activities you can do to become more eco-friendly:</h2>
        <div className="activities-list">
          {activities.map((activity, index) => (
            <div key={index} className="activity">
              <h3 className='activity-header'>{activity.activity}</h3>
              <p  className='activity-message'>{activity.activity_description}</p>
              <p  className='activity-feedback'>{activity.feedback_message}</p>
              <p  className={`activity-score ${activity.eco_score>=0 ? `positive` : `negative` }`}>{activity.eco_score + ' points'}</p>
            </div>
          ))}
          </div>
    </div>
  );
}

export default ActivitiesWizard;