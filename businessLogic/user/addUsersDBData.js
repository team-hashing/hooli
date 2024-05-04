import { usersDB } from "../../firebaseConfig";
import { collection } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../../firebaseConfig";

const addUserDetails = async (points, medals, completedChallenges) => {
  try {
    const usersCollection = collection(usersDB, 'users');
    const userDoc = doc(usersCollection, auth.currentUser.uid);
    await setDoc(userDoc, {
      points: points? points : 0,
      medals: medals? medals : [],
      completedChallenges: completedChallenges? completedChallenges : 0,
    });
  } catch (error) {
    console.error("Error adding user details: ", error);
  }
};


const updateUserDetails = async (points, medals, completedChallenges) => {
  try {
    const usersCollection = collection(usersDB, 'users');
    const userDoc = doc(usersCollection, auth.currentUser.uid);
    await setDoc(userDoc, {
      points: points? points : 0,
      medals: medals? medals : [],
      completedChallenges: completedChallenges? completedChallenges : 0,
    }, { merge: true });
  } catch (error) {
    console.error("Error updating user details: ", error);
  }
}

export { addUserDetails, updateUserDetails };