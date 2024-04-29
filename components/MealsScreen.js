import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const MealsScreen = () => {
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (text) => {
    setUserInput(text);
  };

  return (
    <View>
      <Text>Enter your dietary restrictions:</Text>
      <TextInput
        value={userInput}
        onChangeText={handleInputChange}
        placeholder="e.g., vegan, gluten-free"
      />
      <Button title="Find Meal Plans" onPress={() => {}} />
    </View>
  );
};

export default MealsScreen;
