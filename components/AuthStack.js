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
  <Stack.Navigator>
    <Stack.Screen name="Authenticate" component={AuthChoicePage} />
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="Signup" component={SignupPage} />
  </Stack.Navigator>
);

export default AuthStack;