import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const authSignOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Failed to sign out:', error);
    });
  };