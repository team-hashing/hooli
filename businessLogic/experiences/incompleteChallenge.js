import { HOST } from '@env';
import { usersDB } from "../../firebaseConfig";
import { collection, doc, updateDoc, increment } from "firebase/firestore";
import { auth } from "../../firebaseConfig";

const incompleteChallenge = async (userId, experienceId, challengeId) => {
    try {
        console.log('userId', userId);
        console.log('experienceId', experienceId);
        console.log('challengeId', challengeId);
        const response = await fetch(`http://${HOST}:3000/incompleteChallenge`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                experienceId: experienceId,
                challengeId: challengeId,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Update completedChallenges in Firestore
        const usersCollection = collection(usersDB, 'users');
        const userDoc = doc(usersCollection, auth.currentUser.uid);
        await updateDoc(userDoc, {
            completedChallenges: increment(0)
        });

        return result;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export default incompleteChallenge;