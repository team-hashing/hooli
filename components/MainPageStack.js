// AuthStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DiaryScreen from './DiaryScreen';
import WizardScreen from './WizardScreen';


// Create a stack navigator
const Stack = createStackNavigator();


// Component for authentication-related screens
const MainPageStack = ({ navigation }) => {

  return (
  <Stack.Navigator>
    <Stack.Screen name="DiaryPage" options={{ 
        headerShown: false 
    }} 
    component={DiaryScreen}/>
    <Stack.Screen name="Wizard" options={{
      title: '',
      headerTransparent: true,
      headerLeft:()=>null
    }}
   component={WizardScreen}/>
  </Stack.Navigator>
  )
};

export default MainPageStack;