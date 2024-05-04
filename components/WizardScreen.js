import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { HOST } from '@env'
import { auth } from '../firebaseConfig';
import { Layout, Button, Icon } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';
import ResponseWizardPage from './ResponseWizardPage';
import ActivitiesWizardPage from './ActivitiesWizardPage';
import ChallengesWizardPage from './ChallengesWizardPage';
import LoadingWizardPage from './LoadingWizardPage';



const { width } = Dimensions.get('window');

const WizardScreen = ({ route, navigation }) => {
    const { text } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const { width } = Dimensions.get('window');

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
                  <Icon name='close-outline' style={styles.closeIcon} onPress={() => navigation.navigate('DiaryPage')}/>
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
                <View style={styles.page}>
                    <LoadingWizardPage />
                </View>
            ) : (
            <>
                <View style={styles.page}>
                    <ResponseWizardPage data={data}/>
                </View>
                <View style={styles.page}>
                    <ActivitiesWizardPage data={data}/>
                </View>
                <View style={styles.page}>
                    <ChallengesWizardPage data={data}/>
                </View>
                
            </>
            )}
            
        </ScrollView>
    );

    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
      width: 25,
      height: 25,
      alignSelf: 'center',
      margin: 20
    },
    page: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default WizardScreen;