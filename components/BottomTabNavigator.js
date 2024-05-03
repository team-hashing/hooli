import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6 } from '@expo/vector-icons';
import MealsScreen from './MealsScreen';
import TrainingScreen from './TrainingScreen';
import PsychologyScreen from './PsychologyScreen';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'ProfileStack') {
            iconName = focused ? 'circle-user' : 'circle-user';
          } else if (route.name === 'Meals') {
            iconName = focused ? 'bowl-food' : 'bowl-food';
          } else if (route.name === 'Training') {
            iconName = focused ? 'dumbbell' : 'dumbbell';
          } else if (route.name === 'Psychology') {
            iconName = focused ? 'brain' : 'brain';
          }

          return <FontAwesome6 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Meals" component={MealsScreen} />
      <Tab.Screen name="Training" component={TrainingScreen} />
      <Tab.Screen name="Psychology" component={PsychologyScreen} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;