import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { authLoginPassword } from '../businessLogic/authLoginPassword';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await authLoginPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default SignupPage;
