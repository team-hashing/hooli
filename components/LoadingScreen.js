import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';

const LoadingScreen = () => {
  const theme = useTheme();
  const messages = [
    "Loading application...",
    "Fetching user data...",
    "Setting up the environment...",
  ];


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#637C5A',
      width: '100%',
      height: '100%',
    },
    text: {
      textAlign: 'left',
      color: theme['color-primary-100'],
      fontSize: 40,
      flexWrap: 'wrap',
      fontWeight: 'bold',
      marginBottom: 20,
    },
    image: {
      width: 200, // Or whatever size you want
      height: 200, // Or whatever size you want
      marginBottom: 20,
    },
  });

  const randomMessageRef = messages[Math.floor(Math.random() * messages.length)];

  return (
    <View style={styles.container}>
      <Animatable.Image 
        source={require('../assets/splash.png')} 
        style={styles.image} 
        animation="bounceIn" 
        duration={2000} 
      />
    </View>
  );
};


export default LoadingScreen;