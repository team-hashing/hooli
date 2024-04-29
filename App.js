import React, { createContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthChoicePage from './components/AuthChoicePage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import BottomTabNavigator from './components/BottomTabNavigator';

const Stack = createStackNavigator();
export const AuthContext = createContext({ user: null, isLoggedIn: false });

const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Authenticate" component={AuthChoicePage} />
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="Signup" component={SignupPage} />
  </Stack.Navigator>
);


const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn }}>
      <NavigationContainer>
        {isLoggedIn ? <BottomTabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
