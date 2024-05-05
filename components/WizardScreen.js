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
import { set } from '@gluestack-style/react';



const { width } = Dimensions.get('window');

const WizardScreen = ({ route, navigation }) => {
    const { text } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const screenWidth = Dimensions.get('window').width;

    const handleScroll = (event) => {
        const newPage = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentPage(newPage);
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon name='close-outline' style={styles.closeIcon} onPress={() => navigation.navigate('DiaryPage')} />
            ),
        });
    }, [navigation]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
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

                // Check if data has all required fields
                if (data.hasOwnProperty('message') && data.hasOwnProperty('activities') && data.hasOwnProperty('future_challenges')) {
                    setData(data);
                } else {
                    throw new Error('The response does not have all the required fields.');
                }

                setLoading(false);

            } catch (error) {
                navigation.navigate('DiaryPage', { error: true });
            } finally {
            }
        };

        fetchData();
    }, []);


    return (
        <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={true}
            scrollEventThrottle={16}
            onScroll={handleScroll}
        >
            {loading ? (
                <View style={styles.page}>
                    <LoadingWizardPage />
                </View>
            ) : (
                <>

                    <View style={styles.page}>
                        <ResponseWizardPage data={data} isActive={currentPage === 0} />
                    </View>
                    <View style={styles.page}>
                        <ActivitiesWizardPage data={data} isActive={currentPage === 1} />
                    </View>
                    <View style={styles.page}>
                        <ChallengesWizardPage data={data} isActive={currentPage === 2} />
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