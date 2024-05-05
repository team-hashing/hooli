import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';

// Import your screens
import MainPageStack from './MainPageStack';
import ActivityScreen from './ActivityScreen';
import ChallengeScreen from './ChallengeScreen';
import ProfileStack from './ProfileStack';

const { Navigator, Screen } = createBottomTabNavigator();


  const DiaryIcon = (props) => {
    const focused = props.focused;
    
    return (
      <Animatable.View 
        animation={focused ? "flipInY" : ""} 
        iterationCount={1}
        duration={500} 
        useNativeDriver
      >
        <Icon {...props} name={focused ? 'book-open-outline' : 'book-outline'} />
      </Animatable.View>
    );
  };
  const ActivityIcon = (props) => {
    const focused = props.focused;
    
    return (
      <Animatable.View 
        animation={focused ? "tada" : ""} 
        iterationCount={focused ? 3 : 1}
        duration={500} 
        useNativeDriver
      >
        <Icon {...props} name={focused ? 'activity' : 'activity-outline'} />
      </Animatable.View>
    );
  };
  
  const ChallengeIcon = (props) => {
    const focused = props.focused;
    
    return (
      <Animatable.View 
        animation={focused ? "tada" : ""} 
        iterationCount={1}
        duration={500} 
        useNativeDriver
      >
        <Icon {...props} name={focused ? 'award' : 'award-outline'} />
      </Animatable.View>
    );
  };
  
  const ProfileIcon = (props) => {
    const focused = props.focused;
    
    return (
      <Animatable.View 
        animation={focused ? "rotate" : ""} 
        iterationCount={1}
        duration={500} 
        useNativeDriver
      >
        <Icon {...props} name={focused ? 'person' : 'person-outline'} />
      </Animatable.View>
    );
  };

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}> 
    <BottomNavigationTab title='Diary' icon={(props) => <DiaryIcon {...props} focused={state.index === 0} />} />    
    <BottomNavigationTab title='Activity' icon={(props) => <ActivityIcon {...props} focused={state.index === 1} />} />
    <BottomNavigationTab title='Challenge' icon={(props) => <ChallengeIcon {...props} focused={state.index === 2} />} />
    <BottomNavigationTab title='Profile' icon={(props) => <ProfileIcon {...props} focused={state.index === 3} />} />
  </BottomNavigation>
);

const App = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Diary' options={{ headerShown: false }}  component={MainPageStack}/>
    <Screen name='Activities' component={ActivityScreen}/>
    <Screen name='Challenges' component={ChallengeScreen}/>
    <Screen name='Profile' component={ProfileStack} options={{ headerShown: false }}/>
  </Navigator>
);

export default App;