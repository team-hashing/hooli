import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HOST } from '@env'
import { auth } from '../firebaseConfig';


const ChallengeScreen = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const userId = auth.currentUser.uid;

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

    const deleteChallenge = (challengeId) => {
        const userId = '8eo4fLDnMhhodi2mIWsq5i1ahO82';

        fetch(`http://${HOST}:3000/deleteChallenge`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                challengeId: challengeId,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Challenge deleted successfully') {
                    setExperiences(experiences.filter(experience => experience.id !== challengeId));
                }
            })
            .catch(error => console.error(error));
    };

    const renderRightAction = (challengeId) => {
        return (
            <RectButton style={styles.deleteButton} onPress={() => deleteChallenge(challengeId)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </RectButton>
        );
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <ScrollView>
                {experiences.map((experience, index) => (
                    Array.isArray(experience.future_challenges) && experience.future_challenges.map((challenge, challengeIndex) => (
                        <Swipeable
                            key={`${index}-${challengeIndex}`}
                            renderRightActions={() => renderRightAction(challenge.id)}
                            onSwipeableOpen={(state) => {
                                if (state.swipeDirection === 'right') {
                                    deleteChallenge(challenge.id);
                                }
                            }}
                        >
                            <View style={styles.challengeContainer}>
                                <Text style={styles.challengeTitle}>{challenge.challenge}</Text>
                                <Text style={styles.challengeDescription}>{challenge.challenge_description}</Text>
                                <Text style={styles.challengeDifficulty}>Difficulty: {challenge.challenge_difficulty}</Text>
                            </View>
                        </Swipeable>
                    ))
                ))}
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    challengeContainer: {
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
    challengeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    challengeDescription: {
        fontSize: 16,
        color: '#666',
    },
    challengeDifficulty: {
        fontSize: 14,
        color: '#999',
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: '600',
    },
});

export default ChallengeScreen;