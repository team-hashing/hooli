import React, { createContext, useState, useEffect } 	from 'react';
import { NavigationContainer } 							from '@react-navigation/native';
import { auth } 										from './firebaseConfig';
import { onAuthStateChanged } 							from 'firebase/auth';

import BottomTabNavigator 		from './components/BottomTabNavigator';
import AuthStack 				from './components/AuthStack';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import {  default as theme  } from './theme.json';

import LoadingScreen from './components/LoadingScreen';

// Creating a context for authentication
export const AuthContext = createContext({ user: null, isLoggedIn: false });

const App = () => {
	// State variables for user and login status
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);


	// Effect hook to handle authentication state changes
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {

			if (user) {
				setIsLoggedIn(true);
				setUser(user);

			} else {
				setIsLoggedIn(false);
				setUser(null);
			}

			setTimeout(() => {
				setIsLoading(false);
			}, 200);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();

	}, []);



  return (
	<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
		<AuthContext.Provider value={{ user, isLoggedIn }}>
			<NavigationContainer>
			{ isLoading ? 
			<LoadingScreen /> :
			isLoggedIn ? 
				<BottomTabNavigator /> :
				 <AuthStack />}
			</NavigationContainer>
		</AuthContext.Provider>
		</ApplicationProvider>
	</>
  );
};

export default App;