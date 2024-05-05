import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { addUserDetails } from './addUsersDBData';


export const authSignupPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await addUserDetails(null);
    // Handle successful signup logic here (optional)
  } catch (error) {
    throw error; // Re-throw the error for handling in the SignupPage component
  }
};
