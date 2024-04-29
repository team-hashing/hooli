//create an empty ProfileScreen component
import React from 'react';
import { View, Text, Button } from 'react-native';
import { getAuth } from "firebase/auth";
import { handleSignOut } from '../businessLogic/user/authSignOut';



const ProfileScreen = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    return (
        <View>
            <Text>Profile</Text>
            <Text>Name: {user.displayName} </Text>
            <Text>Email: {user.email} </Text>

            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
};

export default ProfileScreen;