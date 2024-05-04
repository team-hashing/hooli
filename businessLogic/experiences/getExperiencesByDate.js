import { HOST } from '@env';

const getExperiencesByDate = async (userId, date) => {
    try {
      const response = await fetch(`http://${HOST}:3000/getExperiencesByDate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          date: date,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const experiences = await response.json();
      return experiences;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };
  
  export default getExperiencesByDate;