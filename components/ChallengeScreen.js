import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HOST } from '@env'
import { Layout, Text, Card, List } from '@ui-kitten/components';
import { auth } from '../firebaseConfig';


const ChallengeScreen = () => {
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

    const deleteChallenge = (experienceId, challengeId) => {
        const userId = auth.currentUser.uid;

        fetch(`http://${HOST}:3000/deleteChallenge`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                experienceId: experienceId,
                challengeId: challengeId,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    // If the server responds with a status code other than 200, throw an error
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.message === 'Challenge deleted successfully') {
                    // If the challenge was deleted successfully, remove it from the experiences array
                    setExperiences(experiences.map(experience => {
                        if (experience.id === experienceId) {
                            return {
                                ...experience,
                                future_challenges: experience.future_challenges.filter(challenge => challenge.id !== challengeId),
                            };
                        }
                        return experience;
                    }));
                } else {
                    // If the server responded with a message other than 'Challenge deleted successfully', log the message
                    console.error(data.message);
                }
            })
            .catch(error => console.error(error));
    };

    const renderRightAction = (experienceId, challengeId) => {
        console.log(challengeId);
        return (
            <RectButton style={styles.deleteButton} onPress={() => deleteChallenge(experienceId, challengeId)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </RectButton>
        );
    };

    const challenges = experiences.flatMap(experience => experience.future_challenges.map(challenge => ({ ...challenge, experienceId: experience.id })));

  const renderItem = ({ item: challenge }) => (
    <Swipeable renderRightActions={() => renderRightAction(challenge.experienceId, challenge.id)} >
        <Card style={styles.challengeContainer}>
            <Text style={styles.challengeTitle}>{challenge.challenge}</Text>
            <Text style={styles.challengeDescription}>{challenge.challenge_description}</Text>
            <Text style={styles.challengeDifficulty}>Difficulty: {challenge.challenge_difficulty}</Text>
        </Card>
    </Swipeable>
  );

    return (
        <GestureHandlerRootView style={styles.container}>
            <Layout>
                <List
                    data={challenges}
                    renderItem={renderItem}
                />
            </Layout>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    challengeContainer: {
        marginVertical: 5,
        borderRadius: 10,
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
        width: '100%',
        marginVertical: 5,
        borderRadius: 10,
        paddingLeft: '70%',
        marginLeft: '-70%',
        
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'right',
    },
});

export default ChallengeScreen;