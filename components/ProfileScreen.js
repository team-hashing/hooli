//create an empty ProfileScreen component
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";



const ProfileScreen = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    return (
        <View>
        <Text>Profile</Text>
        <Text>Name: {user.displayName} </Text>
        <Text>Email: {user.email} </Text>
        </View>
    );
};

export default ProfileScreen;