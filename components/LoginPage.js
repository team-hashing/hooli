import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { authLoginPassword } from '../businessLogic/user/authLoginPassword';
import { Button, Input, Layout } from '@ui-kitten/components';


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
    <Layout style={styles.container}>
      <Input
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <Input
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button onPress={handleLogin} style={styles.button} >
        Log In
      </Button>
    </Layout>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
  input: {
    marginVertical: 10,
    width: '80%',
  },
};

export default SignupPage;
