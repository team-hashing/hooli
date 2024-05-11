import { HOST } from '@env';
import { usersDB } from "../../firebaseConfig";
import { collection, doc, updateDoc, increment } from "firebase/firestore";
import { auth } from "../../firebaseConfig";


const getUserInfo = async (userId) => {
    try {
        console.log('userId', userId);
        const response = await fetch(`http://${HOST}:3000/getUserAttributes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting user info:', error);
    }
}

export default getUserInfo;