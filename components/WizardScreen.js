import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { HOST } from '@env'
import { auth } from '../firebaseConfig';
import { Layout, Button, Icon } from '@ui-kitten/components';

const { width } = Dimensions.get('window');

const WizardScreen = ({ route, navigation }) => {
    const { text } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const { width } = Dimensions.get('window');
    const numberOfPages = 3; // Update this to the number of pages
    
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
                  <Icon name='close-outline' style={styles.settingsIcon} onPress={() => navigation.navigate('DiaryPage')}/>
          ),
        });
      }, [navigation]);


    useEffect(() => {
        const fetchData = async () => {
        try {
            const userId = auth.currentUser.uid;

            const response = await fetch(`http://${HOST}:3000/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                userId: userId,
            }),
            });

            const data = await response.json();
            setData(data);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);


    const handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        const viewSize = event.nativeEvent.layoutMeasurement;
      
        // Divide the horizontal offset by the width of the view to see which page is visible
        const pageNum = Math.floor(contentOffset.x / viewSize.width);
        setCurrentPage(pageNum);
      };
    
    return (
        <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        >
        {loading ? (
            <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
            ) : (
            <>
                <View style={styles.ResponseMessage}>
                <Text>Screen 1</Text>
                </View>
                <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Screen 2</Text>
                </View>
                <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Screen 3</Text>
                </View>
                
                {/* Add more views for more screens */}
            </>
            )}
            
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    dotsView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    dot: {
        color: 'red',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    configButtonView: {
      backgroundColor: 'transparent',
    },
    settingsIcon: {
      width: 25,
      height: 25,
      alignSelf: 'center',
      margin: 20
    },
    closeButton: {
        backgroundColor: 'transparent',
    },
});

export default WizardScreen;