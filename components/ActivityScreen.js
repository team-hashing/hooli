import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { HOST } from '@env'
import { Layout, Text, Card, List } from '@ui-kitten/components';
import {auth} from '../firebaseConfig';

const ActivityScreen = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const userId = auth.currentUser.uid;
        console.log(userId);

        fetch(`http://${HOST}:3000/getExperiences`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
            }),
        })
            .then(response => response.json())
            .then(data => setExperiences(data))
            .catch(error => console.error(error));
        console.log(experiences);
    }, []);

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