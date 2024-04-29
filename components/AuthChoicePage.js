import React from 'react';
import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthChoicePage = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Log In"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
};

export default AuthChoicePage;