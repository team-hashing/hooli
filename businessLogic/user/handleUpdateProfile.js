import { updateProfile } from "firebase/auth";
import { auth } from '../../firebaseConfig';

export const handleUpdateProfile = async (displayName, photoURL) => {
  const user = auth.currentUser;

  try {
    await updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL
    });
    console.log('Profile updated');
  } catch (error) {
    console.error('Failed to update profile:', error);
  }
};