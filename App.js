import React, { createContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import BottomTabNavigator from './components/BottomTabNavigator';
import AuthStack from './components/AuthStack'; // Importing AuthStack from its own file

// Creating a context for authentication
export const AuthContext = createContext({ user: null, isLoggedIn: false });

const App = () => {
  // State variables for user and login status
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Effect hook to handle authentication state changes
  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, update state
        setIsLoggedIn(true);
        setUser(user);
      } else {
        // If user is logged out, update state
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    // Provide auth context to children
    <AuthContext.Provider value={{ user, isLoggedIn }}>
      <NavigationContainer>
        {/* Render different navigators based on auth state */}
        {isLoggedIn ? <BottomTabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;