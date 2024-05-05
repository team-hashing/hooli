import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import Voice from 'react-native-voice';
import { StyleSheet } from 'react-native';

export default function ButtonToSpeak() {
    let [started, setStarted] = useState(false);
    let [results, setResults] = useState([]);


    useEffect(() => {
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechResults = onSpeechResults;
  
      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      }
    }, []);


    const startSpeechToText = async () => {
        console.log('start');
        await Voice.start("en-NZ");
        setStarted(true);
      };
    
      const stopSpeechToText = async () => {
        console.log('stop');
        await Voice.stop();
        setStarted(false);
      };
    
      const onSpeechResults = (result) => {
        setResults(result.value);
      };
    
      const onSpeechError = (error) => {
        console.log(error);
      };
    
        const styles = StyleSheet.create({
            container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            },
        });

        return (
            <View style={styles.container}>
            {!started ? <Button title='Start Speech to Text' onPress={startSpeechToText} /> : undefined}
            {started ? <Button title='Stop Speech to Text' onPress={stopSpeechToText} /> : undefined}
            {results.map((result, index) => <Text key={index}>{result}</Text>)}
            <StatusBar style="auto" />
            </View>
        );
        }