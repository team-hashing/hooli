import { usersDB } from "../../firebaseConfig";
import { collection } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../../firebaseConfig";

const addUserDetails = async (birthdate, height, complexity, workoutRatePerWeek) => {
  try {
    const usersCollection = collection(usersDB, 'users');
    const userDoc = doc(usersCollection, auth.currentUser.uid);
    await setDoc(userDoc, {
      birthdate: birthdate? birthdate : null,
      height: height? height : null,
      complexity: complexity? complexity : null,
      workoutRatePerWeek: workoutRatePerWeek? workoutRatePerWeek : null,
    });
  } catch (error) {
    console.error("Error adding user details: ", error);
  }
};


const updateUserDetails = async (birthdate, height, complexity, workoutRatePerWeek) => {
  try {
    const usersCollection = collection(usersDB, 'users');
    const userDoc = doc(usersCollection, auth.currentUser.uid);
    await setDoc(userDoc, {
      birthdate: birthdate? birthdate : null,
      height: height? height : null,
      complexity: complexity? complexity : null,
      workoutRatePerWeek: workoutRatePerWeek? workoutRatePerWeek : null,
    }, { merge: true });
  } catch (error) {
    console.error("Error updating user details: ", error);
  }
}

export { addUserDetails, updateUserDetails };