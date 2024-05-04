import { updatePassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';

export const handleUpdatePassword = async (newPassword) => {
  const user = auth.currentUser;

  try {
    await updatePassword(user, newPassword);
    console.log('Password updated');
  } catch (error) {
    console.error('Failed to update password:', error);
  }
};