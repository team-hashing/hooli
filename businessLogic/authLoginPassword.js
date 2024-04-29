import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';


export const authLoginPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Handle successful signup logic here (optional)
  } catch (error) {
    throw error; // Re-throw the error for handling in the SignupPage component
  }
};
