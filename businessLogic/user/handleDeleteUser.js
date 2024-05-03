import { deleteUser } from "firebase/auth";
import { auth } from '../../firebaseConfig';

export const handleDeleteUser = async () => {
  const user = auth.currentUser;

  try {
    await deleteUser(user);
    console.log('User deleted');
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};