import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { HOST } from '@env'

const TrainingScreen = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const userId = '8eo4fLDnMhhodi2mIWsq5i1ahO82';

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
    }, []);

    return (
        <ScrollView style={styles.container}>
            {experiences.map((experience, index) => (
                Array.isArray(experience.activities) && experience.activities.map((activity, activityIndex) => (
                    <View key={`${index}-${activityIndex}`} style={styles.activityContainer}>
                        <Text style={styles.activityTitle}>{activity.activity}</Text>
                        <Text style={styles.activityDescription}>{activity.activity_description}</Text>
                        <Text style={styles.feedbackMessage}>{activity.feedback_message}</Text>
                        <Text style={activity.eco_friendly ? styles.ecoFriendly : styles.notEcoFriendly}>
                            {activity.eco_friendly ? 'Eco-friendly' : 'Not eco-friendly'}
                        </Text>
                    </View>
                ))
            ))}
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    activityContainer: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
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

export default TrainingScreen;