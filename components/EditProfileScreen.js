import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, Layout, Avatar, Text, Input } from '@ui-kitten/components';
import { handleUpdateProfile } from '../businessLogic/user/handleUpdateProfile';
import { auth } from '../firebaseConfig';
// import { launchImageLibrary } from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';

const EditProfileScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const [name, setName] = useState(user.displayName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);

  const handleEditProfile = async () => {
    await handleUpdateProfile(user, {
      displayName: name,
      photoURL: photoURL
    });

    
    Alert.alert('Success', 'Your profile has been updated.');
    navigation.goBack();
  };

  // const handleUploadPhoto = () => {
  //   const options = {
  //       mediaType: 'photo',
  //       maxWidth: 500,
  //       maxHeight: 500,
  //       quality: 1,
  //       includeBase64: true,
  //     };

  //   launchImageLibrary(options, async (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       const source = { uri: response.assets[0].uri };
  //       const reference = storage().ref(response.fileName);

  //       await reference.putFile(source.uri);

  //       const url = await reference.getDownloadURL();

  //       setPhotoURL(url);
  //       console.log('Photo uploaded');
  //       console.log(url);
  //     }
  //   });
  // };

  return (
    <Layout style={styles.container}>
      {/* <Avatar style={styles.avatar} source={{ uri: photoURL }} /> */}
      <Input style={styles.input} value={name} onChangeText={setName} />
      {/* <Button style={styles.button} appearance='outline' status='info' onPress={handleUploadPhoto}>Change Photo</Button> */}
      <Button style={styles.button} status='success' onPress={handleEditProfile}>Save</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  // Define your styles here
});

export default EditProfileScreen;