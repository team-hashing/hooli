import { HOST } from '@env';
import { usersDB } from "../../firebaseConfig";
import { collection, doc, updateDoc, increment } from "firebase/firestore";
import { auth } from "../../firebaseConfig";

const getExperiences = async (userId) => {
    try {
      const response = await fetch(`http://${HOST}:3000/getExperiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
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
  
  export default getExperiences;