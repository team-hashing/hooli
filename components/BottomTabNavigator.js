import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Import your screens
import DiaryScreen from './DiaryScreen';
import ActivityScreen from './ActivityScreen';
import ChallengeScreen from './ChallengeScreen';
import ProfileStack from './ProfileStack';

const { Navigator, Screen } = createBottomTabNavigator();

const DiaryIcon = (props) => (
  <Icon {...props} name='book-outline'/>
);

const ActivityIcon = (props) => (
  <Icon {...props} name='activity-outline'/>
);

const ChallengeIcon = (props) => (
  <Icon {...props} name='award-outline'/>
);

const ProfileIcon = (props) => (
  <Icon {...props} name='person-outline'/>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Diary' icon={DiaryIcon}/>
    <BottomNavigationTab title='Activities' icon={ActivityIcon}/>
    <BottomNavigationTab title='Challenges' icon={ChallengeIcon}/>
    <BottomNavigationTab title='Profile' icon={ProfileIcon}/>
  </BottomNavigation>
);

const App = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Diary' options={{ headerShown: false }} component={DiaryScreen}/>
    <Screen name='Activities' component={ActivityScreen}/>
    <Screen name='Challenges' component={ChallengeScreen}/>
    <Screen name='Profile' component={ProfileStack} options={{ headerShown: false }}/>
  </Navigator>
);

export default App;