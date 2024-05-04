import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, Layout, Avatar, Divider, Text, Modal, Card, Input, Icon } from '@ui-kitten/components';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { settings } from 'firebase/analytics';
  

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(auth.currentUser);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        await auth.currentUser.reload();
        const { displayName, email, photoURL } = auth.currentUser;
        setUser({ displayName, email, photoURL });
      };
  
      fetchUser();
    }, [])
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon name='settings-outline' style={styles.settingsIcon}  status='info' onPress={() => navigation.navigate('ProfileConfig')}/>
      ),
    });
  }, [navigation]);

  return (
    <Layout style={styles.container}>
      <Avatar style={styles.avatar} source={require('../assets/avatar.png')} />
      <Text category='h1' style={styles.text}>Name: {user.displayName}</Text>
      <Text category='s1' style={styles.text}>Email: {user.email}</Text>
     {/* <Button style={styles.button} appearance='outline' status='info' onPress={() => navigation.navigate('EditProfile')}>Edit Profile</Button>
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
      </Modal> */}

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
  settingsIcon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    margin: 20
  },
});

export default ProfileScreen;