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
    console.log(`Open wizard screen`)
    const fetchData = async () => {

      console.log(`Calling the API`)
      console.log(`${process.env.REACT_APP_HOST}`)

      const response = await fetch(`${process.env.REACT_APP_HOST}/generateDemo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
        }),
      });

      const data = await response.json();
      console.log(data)
      setData(data);
      setIsLoading(false);
    };
    fetchData();
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