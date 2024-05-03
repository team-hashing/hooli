import React, { useState } from 'react';
import { StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button, Input, Layout } from '@ui-kitten/components';

const MealsScreen = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const generateContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http:/192.168.1.144:3000/generate?text=${encodeURIComponent(text)}`);
      const data = await response.json(); 
      setData(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={styles.container}>
      <Input
        multiline={true}
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter text"
        numberOfLines={4}
      />
      <Button onPress={generateContent} style={styles.button} disabled={loading}>
        Generate
      </Button>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
  input: {
    marginVertical: 10,
    width: '80%',
    minHeight: 64,
    maxHeight: 280,
    overflow: 'auto',
  },
});

export default MealsScreen;