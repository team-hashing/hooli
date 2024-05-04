import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Card, List } from '@ui-kitten/components';
import {auth} from '../firebaseConfig';
import DayPickerComponent from './dayPickerComponent';
import getExperiencesByDate from '../businessLogic/experiences/getExperiencesByDate';
import { useFocusEffect } from '@react-navigation/native';

const ActivityScreen = () => {
    const [experiences, setExperiences] = useState([]);

    const handleDateChange = (date) => {
        getExperiencesByDate(auth.currentUser.uid, date)
            .then(response => setExperiences(response))
            .catch(error => console.error(error));
            setExperiences(experiences);
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
          <Text style={styles.activityTitle}>{activity.activity}</Text>
          <Text style={styles.activityDescription}>{activity.activity_description}</Text>
          <Text style={styles.feedbackMessage}>{activity.feedback_message}</Text>
          <Text style={activity.eco_friendly ? styles.ecoFriendly : styles.notEcoFriendly}>
            {activity.eco_friendly ? 'Eco-friendly' : 'Not eco-friendly'}
          </Text>
        </Card>
      );

    const activities = experiences.flatMap(experience => experience.activities);


    return (
        <Layout style={styles.container}>
            <DayPickerComponent onDateChange={handleDateChange} />
            <List
                data={activities}
                renderItem={renderItem}
            />
        </Layout>
      );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
    ecoFriendly: {
        fontSize: 14,
        color: 'green',
        marginTop: 10,
    },
    notEcoFriendly: {
        fontSize: 14,
        color: 'red',
        marginTop: 10,
    },
});

export default ActivityScreen;