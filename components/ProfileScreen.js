import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, Layout, Avatar, Divider, Text, Modal, Card, Input } from '@ui-kitten/components';
import { auth } from '../firebaseConfig';
import { authSignOut } from '../businessLogic/user/authSignOut';
import { handleUpdatePassword } from '../businessLogic/user/handleUpdatePassword';
import { handleDeleteUser } from '../businessLogic/user/handleDeleteUser';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
  
const handleChangePassword = async (newPassword) => {
  // Implement the logic to change the password
  await handleUpdatePassword(newPassword);
  Alert.alert('Success', 'Your password has been changed.');
};

const handleDeleteAccount = async () => {
  // Implement the logic to delete the account
  await handleDeleteUser();
};

const handleSignOut = async () => {
  // Implement the logic to sign out
  await authSignOut();
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(auth.currentUser);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleChangePassword, setVisibleChangePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
  }, []);

  const toggleModalDelete = () => {
    setVisibleDelete(!visibleDelete);
  };

  const toggleModalChangePassword = () => {
    setVisibleChangePassword(!visibleChangePassword);
  };

  const handleDelete = async () => {
    toggleModalDelete();
    await handleDeleteAccount();
  };

  const handlePasswordChange = async () => {
    if (password === confirmPassword) {
      await handleChangePassword(password);
      toggleModalChangePassword();
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <Layout style={styles.container}>
      <Avatar style={styles.avatar} source={require('../assets/avatar.png')} />
      <Text category='h1' style={styles.text}>Name: {user.displayName}</Text>
      <Text category='s1' style={styles.text}>Email: {user.email}</Text>
      <Button style={styles.button} appearance='outline' status='info' onPress={() => navigation.navigate('EditProfile')}>Edit Profile</Button>
     <Divider style={styles.divider} />
      <Text category='h6' style={styles.text}>Settings</Text>
      <Button style={styles.button} appearance='outline' status='info' onPress={toggleModalChangePassword}>Change Password</Button>
      <Modal visible={visibleChangePassword} backdropStyle={styles.backdrop} onBackdropPress={toggleModalChangePassword}>
        <Card disabled={true}>
          <Text category='h6'>Change Password</Text>
          <Input placeholder='New Password' value={password} onChangeText={setPassword} secureTextEntry={true} />
          <Input placeholder='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
          <Button style={styles.button} appearance='outline' status='success' onPress={toggleModalChangePassword}>Cancel</Button>
          <Button style={styles.button} status='success' onPress={handlePasswordChange}>Change Password</Button>
        </Card>
      </Modal>
      <Button style={styles.button} appearance='outline' status='danger' onPress={handleSignOut}>Sign Out</Button>
      <Button style={styles.button} status='danger' onPress={toggleModalDelete}>Delete Account</Button>
      <Modal visible={visibleDelete} backdropStyle={styles.backdrop} onBackdropPress={toggleModalDelete}>
        <Card disabled={true}>
          <Text category='h6'>Are you sure you want to delete your account?</Text>
          <Button style={styles.button} appearance='outline' status='info' onPress={toggleModalDelete}>Cancel</Button>
          <Button style={styles.button} status='danger' onPress={handleDelete}>Confirm</Button>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  text: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
    width: '100%',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E4E4E4',
    marginVertical: 15,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ProfileScreen;