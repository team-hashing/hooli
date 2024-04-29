import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const MealsScreen = () => {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (text) => {
    setUserInput(text);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Failed to sign out:', error);
    });
  };

  return (
    <View>
      <Text>Enter your dietary restrictions:</Text>
      <TextInput
        value={userInput}
        onChangeText={handleInputChange}
        placeholder="e.g., vegan, gluten-free"
      />
      <Button title="Find Meal Plans" onPress={() => {}} />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default MealsScreen;
