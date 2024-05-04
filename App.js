import React, { createContext, useState, useEffect } 	from 'react';
import { NavigationContainer } 							from '@react-navigation/native';
import { auth } 										from './firebaseConfig';
import { onAuthStateChanged } 							from 'firebase/auth';

import BottomTabNavigator 		from './components/BottomTabNavigator';
import AuthStack 				from './components/AuthStack';
import Record 					from './components/Record';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import {  default as theme  } from './theme.json';

import { Layout } from '@ui-kitten/components';

// Creating a context for authentication
export const AuthContext = createContext({ user: null, isLoggedIn: false });

const App = () => {
	// State variables for user and login status
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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

		});

		// Cleanup subscription on unmount
		return () => unsubscribe();

	}, []);


	const [speechText, setSpeechText] = useState("");
	const speech = (
		<View>
			<View >
				<Text>Speech Text</Text>
				<TextInput
					multiline

					numberOfLines={6}
					value={speechText}
					maxLength={500}
					editable={true}
					style={{
						borderColor: "black",
						borderWidth: 1,
						margin: 10,
						padding: 10,
						textAlignVertical: "top",
						backgroundColor: "#A00",
					}}
				/>
				<View
					style={{
						alignItems: "flex-end",
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Button
						title="Save"
						color={"#007AFF"}
						onPress={async () => {
							console.log("save");
						}}
					/>
					<Button
						title="Clear"
						color={"#007AFF"}
						onPress={() => {
							setSpeechText("");
						}}
					/>
				</View>
			</View>
			<Record
				onSpeechEnd={(value) => {
					setSpeechText(value[0]);
				}}
				onSpeechStart={() => {
					setSpeechText("");
				}}
			/>
		</View>
	);

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AuthContext.Provider value={{ user, isLoggedIn }}>
        <NavigationContainer>
          {/* Render different navigators based on auth state */}
          {isLoggedIn ? <BottomTabNavigator /> : <AuthStack />}
        </NavigationContainer>
      </AuthContext.Provider>
    </ApplicationProvider>
  );
};

export default App;