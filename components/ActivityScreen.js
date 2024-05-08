import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Layout, Text, Card, List } from '@ui-kitten/components';
import {auth} from '../firebaseConfig';
import DayPickerComponent from './dayPickerComponent';
import getExperiencesByDate from '../businessLogic/experiences/getExperiencesByDate';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native-animatable';

const ActivityScreen = () => {
    const [isLoading, setIsLoading] = useState();
    const [experiences, setExperiences] = useState([]);

    const handleDateChange = (date) => {
        setIsLoading(true);
        getExperiencesByDate(auth.currentUser.uid, date)
            .then(response => {
                setExperiences(response);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
        
    };

    const callback = React.useCallback(() => {
        const userId = auth.currentUser.uid;
        getExperiencesByDate(userId, new Date().toISOString().split('T')[0])
            .then(response => setExperiences(response))
            .catch(error => console.error(error));
        }, []);
    
    useFocusEffect(callback);

    const renderItem = ({ item: activity }) => (
        <Card style={styles.activityContainer}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>{activity.activity}</Text>
            <Text style={styles.activityPoints} status={activity.eco_score > 0 ? 'primary':'danger'}>{activity.eco_score}</Text>
          </View>
          <Text style={styles.activityDescription}>{activity.activity_description}</Text>
          <Text style={styles.ecoFriendlyText}  status={activity.eco_friendly? 'primary':'danger'}>
            {activity.eco_friendly ? 'Eco-friendly' : 'Not eco-friendly'}
          </Text>
          <Text style={styles.feedbackMessage}>{activity.feedback_message}</Text>
        </Card>
      );

    const activities = experiences.flatMap(experience => experience.activities);


    return (
        <Layout style={styles.container}>
            <DayPickerComponent onDateChange={handleDateChange} />
            {isLoading ?
            (
            <ActivityIndicator size="large" color="#00ff00" />
            ) : (
                activities.length === 0 ? (
                <>
                    <Text style={styles.ActivitiesNotFoundText}>No activities found for this day</Text>
                </>
                ) : (
                    <List
                        style={styles.list}
                        data={activities}
                        renderItem={renderItem}
                    />
                )
            )}
        </Layout>
      );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    activityContainer: {
        margin: 10,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 3,
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        width: '80%',
    },
    activityPoints: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        width: '10%',
        textAlign: 'right'
    },
    activityDescription: {
        fontSize: 16,
        color: '#666',
    },
    feedbackMessage: {
        fontSize: 14,
        color: '#999',
        marginTop: 10,
    },
    ecoFriendlyText: {
        fontSize: 14,
        marginTop: 10,
    },
    list: {
        backgroundColor: 'transparent',
    },
    ActivitiesNotFoundText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: '#999',
    },
    activityHeader: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    }
});

export default ActivityScreen;