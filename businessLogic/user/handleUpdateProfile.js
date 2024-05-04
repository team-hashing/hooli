import { updateProfile } from "firebase/auth";
import { auth } from '../../firebaseConfig';

export const handleUpdateProfile = async (displayName, photoURL) => {
  const user = auth.currentUser;

  console.log(user);
  console.log("photoURL");
  console.log(photoURL);
  console.log("displayName");
  console.log(displayName);

  try {
    await updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL
    });
  } catch (error) {
    console.error('Failed to update profile:', error);
  }
};