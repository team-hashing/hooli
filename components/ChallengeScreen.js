import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HOST } from '@env'
import { Layout, Text, Card, List, CheckBox } from '@ui-kitten/components';
import { auth } from '../firebaseConfig';
import getExperiencesByDate from '../businessLogic/experiences/getExperiencesByDate';
import { useFocusEffect } from '@react-navigation/native';
import completeChallenge from '../businessLogic/experiences/completeChallenge';
import incompleteChallenge from '../businessLogic/experiences/incompleteChallenge';
import deleteChallenge from '../businessLogic/experiences/deleteChallenge';
import { set } from '@gluestack-style/react';

const ChallengeScreen = () => {
    const [experiences, setExperiences] = useState([]);




    const handleDateChange = (date) => {
        getExperiencesByDate(auth.currentUser.uid, date)
            .then(response => setExperiences(response))
            .catch(error => console.error(error));
        setExperiences(experiences);

    };

    const challenges = experiences.flatMap(experience =>
        Array.isArray(experience.future_challenges)
            ? experience.future_challenges.map(challenge => ({ ...challenge, experienceId: experience.id }))
            : []
    );


    const callback = React.useCallback(() => {
        const userId = auth.currentUser.uid;
        const date = new Date().toISOString().split('T')[0];
        handleDateChange(date);
    }, []);

    useFocusEffect(callback);


    const handleDelete = (experienceId, challengeId) => {
        const userId = auth.currentUser.uid;
        deleteChallenge(userId, experienceId, challengeId);
        console.log("Challenge deleted successfully")
        setExperiences(experiences.map(experience => {
            if (experience.id === experienceId) {
                return {
                    ...experience,
                    future_challenges: experience.future_challenges.filter(challenge => challenge.id !== challengeId),
                };
            }
            return experience;
        }));

        console.log("Challenge not deleted");
    };


    const renderRightAction = (experienceId, challengeId) => {
        return (
            <RectButton style={styles.deleteButton} onPress={() => handleDelete(experienceId, challengeId)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </RectButton>
        );
    };


    const renderItem = ({ item: challenge }) => {
        const handleCheckboxChange = async (challenge) => {
            console.log("C completo? ", challenge.isCompleted);
            const userId = auth.currentUser.uid;
            if (challenge.isCompleted) {
                await incompleteChallenge(userId, challenge.experienceId, challenge.id);
            } else {
                await completeChallenge(userId, challenge.experienceId, challenge.id);
            }

            handleDateChange(new Date().toISOString().split('T')[0]);

        };

        return (
            <Swipeable renderRightActions={() => renderRightAction(challenge.experienceId, challenge.id)} >
                <Card style={styles.challengeContainer}>
                    <Text style={styles.challengeTitle}>{challenge.challenge}</Text>
                    <Text style={styles.challengeDescription}>{challenge.challenge_description}</Text>
                    <Text style={styles.challengeDifficulty}>Difficulty: {challenge.challenge_difficulty}</Text>
                    <CheckBox
                        style={styles.checkBox}
                        onChange={() => (handleCheckboxChange(challenge))}
                        checked={challenge.isCompleted}
                    ></CheckBox>
                </Card>
            </Swipeable>
        );
    };



    return (
        <GestureHandlerRootView style={styles.container}>
            <Layout style={styles.layoutContainer}>
                {challenges.length === 0 && (
                    <>
                        <Text style={styles.ChallengesNotFoundText}>No challenges found</Text>
                    </>)}
                <List
                    style={styles.list}
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
    checkBox: {
        alignSelf: 'flex-end',
    },
    ChallengesNotFoundText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: '#999',
    },
    layoutContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChallengeScreen;