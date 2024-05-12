import React, { useEffect, useState } from 'react';
import LoadingWizard from './LoadingWizard';
import ResponseWizard from './ResponseWizard';
import ActivitiesWizard from './ActivitiesWizard';
import ChallengesWizard from './ChallengesWizard';
import './Wizard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import PromoWizard from './PromoWizard';

function Wizard({ inputText }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isTop, setIsTop] = useState(true);

    console.log(inputText);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://${process.env.REACT_APP_HOST}:3000/generateDemo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
        }),
      });

      const data = await response.json();
      setData(data);
      setIsLoading(false);
    };
    setData({
        message: 'Great job on your eco-friendly efforts today! You made several choices that helped reduce your carbon footprint and support local businesses. Keep up the good work! Remember those grocery bags tomorrow, and see if Sarah is up for carpooling - together you can make an even bigger impact!',
        activities: [
          {
            activity: 'Made breakfast at home',
            activity_description: 'Prepared breakfast at home instead of buying disposable food at a coffee shop.',
            feedback_message: 'Excellent choice! By making breakfast at home, you reduced waste and saved money.',
            eco_friendly: true,
            category: 'food',
            eco_score: 8
          },
          {
            activity: 'Used reusable mug',
            activity_description: 'Drank tea from a reusable mug instead of a disposable cup.',
            feedback_message: 'Good job! Using a reusable mug reduces waste and helps conserve resources.',
            eco_friendly: true,
            category: 'waste',
            eco_score: 7
          },
          {
            activity: 'Packed lunch in reusable containers',
            activity_description: 'Packed lunch in reusable containers instead of using disposable bags and containers.',
            feedback_message: 'Fantastic! By packing your lunch in reusables, you significantly reduced waste.',
            eco_friendly: true,
            category: 'waste',
            eco_score: 9
          },
          {
            activity: 'Forgot reusable grocery bags',
            activity_description: 'Forgot to bring reusable grocery bags to the store, resulting in the use of disposable plastic bags.',
            feedback_message: 'Remember those bags tomorrow! Even small changes can make a big difference.',
            eco_friendly: false,
            category: 'waste',
            eco_score: -3
          },
          {
            activity: 'Used reusable produce bags',
            activity_description: 'Brought reusable produce bags to the grocery store, reducing the need for plastic bags.',
            feedback_message: 'Great job using reusable produce bags! Every little bit counts.',
            eco_friendly: true,
            category: 'waste',
            eco_score: 6
          },
          {
            activity: 'Purchased local and seasonal groceries',
            activity_description: 'Bought produce and other items that were locally sourced and in season.',
            feedback_message: 'Excellent choice! Supporting local farms reduces your carbon footprint and promotes sustainable agriculture.',
            eco_friendly: true,
            category: 'food',
            eco_score: 10
          },
          {
            activity: 'Fixed bike',
            activity_description: 'Repaired your bike, enabling you to use it for transportation instead of taking the bus.',
            feedback_message: "Fantastic! By fixing your bike, you're reducing your carbon footprint and getting some exercise.",
            eco_friendly: true,
            category: 'transport',
            eco_score: 8
          },
          {
            activity: 'Ordered takeout in recycled containers',
            activity_description: 'Ordered takeout food that came in recycled containers.',
            feedback_message: "While it's great that the containers were recycled, try to cook at home more often to reduce your environmental impact even further.",
            eco_friendly: true,
            category: 'food',
            eco_score: 4
          },
          {
            activity: 'Composted food scraps',
            activity_description: 'Composted food scraps from the takeout meal.',
            feedback_message: 'Composting is a great way to reduce waste and improve soil health.',
            eco_friendly: true,
            category: 'waste',
            eco_score: 6
          }
        ],
        future_challenges: [
          {
            challenge: 'Remember grocery bags',
            challenge_description: 'Make sure to bring your reusable grocery bags with you next time you go shopping.',
            challenge_difficulty: 1
          },
          {
            challenge: 'Carpool with Sarah',
            challenge_description: 'Talk to your coworker Sarah about carpooling to work together.',
            challenge_difficulty: 2
          }
        ]
      })
    setIsLoading(false);
    //fetchData();
  }, [inputText]);

  window.onscroll = () => {
    const atTop = window.scrollY <= 250;
    setIsTop(atTop);
  };

  const refreshPage = (event) => {
    event.stopPropagation();
    console.log('refreshing');
    window.location.reload();
  }

  console.log(isTop);

  return (
    <div className='wizard-container'>
    {isLoading ? (
          <LoadingWizard /> 
      ) : (
          <div className="scroll-container">
              <div onClick={(event) => refreshPage(event)} className='close-button'>
                <FontAwesomeIcon icon={faTimes} size='2x' />
              </div>
          {isTop && (
            <div className="down-arrow" >
              <FontAwesomeIcon icon={faArrowDown} size='2x' />
            </div>
          )}
              <div className="page">
                  <ResponseWizard message={data.message} />
                  <br></br>
                  <ActivitiesWizard activities={data.activities} />
                  <br></br>
                  <ChallengesWizard challenges={data.future_challenges} />
                  <br></br>
                  <PromoWizard />
              </div>
          </div>
    )}
    </div>
  )
}

export default Wizard;