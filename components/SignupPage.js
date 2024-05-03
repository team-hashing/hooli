import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import { authSignupPassword } from '../businessLogic/user/authSignupPassword';
import { Button, Input, Layout } from '@ui-kitten/components';

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
    <Layout style={styles.container}>
      <Input
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
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
      <Button onPress={handleSignup} style={styles.button}>
        Signup
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
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
});

export default SignupPage;