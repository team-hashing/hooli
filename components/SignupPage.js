import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import { authSignupPassword } from '../businessLogic/authSignupPassword';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = async () => {
    try {
      await authSignupPassword(email, password);
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: username,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default SignupPage;