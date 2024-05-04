import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';


const LoadingWizardPage = () => {
  const theme = useTheme();
  const [displayedMessage, setDisplayedMessage] = useState('');

  const messages = [
    "Analyzing prompt for eco-friendly suggestions",
    "Greenifying your prompt Stay tuned!",
    "Hang tight! We're digging for eco-friendly gems",
    "Turning your prompt green... Just a moment!",
    "Eco-transformation underway Keep calm and stay green!",
    "Unearthing eco-friendly insights Patience is green!",
    "Working our green magic on your prompt",
    "Eco-Analyzer in progress... Unleashing green potential!",
    "Sprinkling some green on your prompt",
    "Eco-optimization in progress... Hang tight!",
    "Turning the eco-friendly gears... Stay tuned!",
    "Your prompt is getting a green makeover",
    "Working on making your prompt more eco-friendly",
    "Eco-friendly transformation in progress",
    "Analyzing for green insights... Hold on!",
    "Your prompt is being greenified",
    "We're working on eco-optimizing your prompt",
    "Eco-optimization underway... Stay tuned!",
    "Sprucing up your prompt with some green",
    "Your prompt is on its way to becoming more eco-friendly",
  ];

  const Dot = ({ delay }) => (
    <Animatable.View
      animation={{
        0: { opacity: 0.5, scale: 0.5 },
        0.5: { opacity: 1, scale: 1 },
        1: { opacity: 0.5, scale: 0.5 },
      }}
      delay={delay}
      iterationCount="infinite"
      style={styles.dot}
    />
  );

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#637C5A',
        width: '100%',
    },
    text: {
        marginTop: 20,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: 'bold',
        padding: 20,
    },
    dots: {
      flexDirection: 'row',
      marginTop: 20,
    },
    dot: {
      backgroundColor: '#FFFFFF',
      width: 10,
      height: 10,
      borderRadius: 5,
      margin: 5,
    },
    });

    useEffect(() => {
        let wordIndex = 0;
        const words = randomMessage.split(' ');
    
        const timer = setInterval(() => {
          setDisplayedMessage((prevMessage) => prevMessage + ' ' + words[wordIndex]);
          wordIndex++;
    
          if (wordIndex >= words.length) {
            clearInterval(timer);
          }
        }, 300); // Adjust speed of appearance
    
        return () => clearInterval(timer);
      }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayedMessage}</Text>
      <View style={styles.dots}>
        <Dot delay={0}/>
        <Dot delay={200}/>
        <Dot delay={400}/>
      </View>
    </View>
  );


};

export default LoadingWizardPage;