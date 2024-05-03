// AuthStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthChoicePage from './AuthChoicePage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

// Create a stack navigator
const Stack = createStackNavigator();

// Component for authentication-related screens
const AuthStack = () => (
  <Stack.Navigator options={{
    headerTransparent: true
  }}>
    <Stack.Screen name="Authenticate" component={AuthChoicePage} options={{
    headerShown: false
  }}/>
    <Stack.Screen name="Login" component={LoginPage} options={{
    headerTransparent: true,
    headerStyle: {
      color: 'white'
    }
  }} />
    <Stack.Screen name="Signup" component={SignupPage} options={{
    headerTransparent: true
  }}/>
  </Stack.Navigator>
);

export default AuthStack;