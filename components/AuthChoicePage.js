import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const AuthChoicePage = () => {
  const navigation = useNavigation();

  return (
    <Layout style={styles.container}>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        Log In
      </Button>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}
      >
        Sign Up
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
});

export default AuthChoicePage;