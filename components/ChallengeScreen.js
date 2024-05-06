import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Layout, Text, Card, List, CheckBox, Popover, Icon, Button } from '@ui-kitten/components';
import { auth } from '../firebaseConfig';
import getExperiences from '../businessLogic/experiences/getExperiences';
import { useFocusEffect } from '@react-navigation/native';
import completeChallenge from '../businessLogic/experiences/completeChallenge';
import incompleteChallenge from '../businessLogic/experiences/incompleteChallenge';
import deleteChallenge from '../businessLogic/experiences/deleteChallenge';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native-animatable';


const ChallengeScreen = () => {  
    const navigation = useNavigation();
    const [experiences, setExperiences] = useState([]);
    const [filter, setFilter] = useState('all');
    const [visible, setVisible] = useState(false);
  

    const FilterMenu = () => (
        <Layout>
            <Button appearance={filter === 'all' ? 'primary': 'ghost'} status='basic' style={styles.filterButton} title="All" onPress={() => { setFilter('all'); setVisible(false); }}> All </Button>
            <Button appearance={filter === 'completed' ? 'primary': 'ghost'} status='basic' style={styles.filterButton} title="Completed" onPress={() => { setFilter('completed'); setVisible(false); }}> Completed </Button>
            <Button appearance={filter === 'notCompleted' ? 'primary': 'ghost'} status='basic' style={styles.filterButton} title="Pending" onPress={() => { setFilter('notCompleted'); setVisible(false); }}> Pending </Button>
        </Layout>
    );

    const handleChallengeChange = () => {
        getExperiences(auth.currentUser.uid)
            .then(response => setExperiences(response))
            .catch(error => console.error(error));

    };

    const challenges = experiences.flatMap(experience =>
        Array.isArray(experience.future_challenges)
            ? experience.future_challenges.map(challenge => ({ ...challenge, experienceId: experience.id }))
            : []
    );


    const callback = React.useCallback(() => {
        handleChallengeChange();
    }, []);

    useFocusEffect(callback);

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Popover
              visible={visible}
              anchor={() => <Icon style={styles.filterIcon} name='options-outline' onPress={() => setVisible(true)} />}
              onBackdropPress={() => setVisible(false)}>
              <FilterMenu />
            </Popover>
          ),
        });
      }, [navigation, visible]);

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
    };


    const renderRightAction = (experienceId, challengeId) => {
        return (
            <RectButton style={styles.deleteButton} onPress={() => handleDelete(experienceId, challengeId)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </RectButton>
        );
    };

    const filteredChallenges = challenges.filter(challenge => {
        if (filter === 'completed') {
        return challenge.isCompleted;
        } else if (filter === 'notCompleted') {
        return !challenge.isCompleted;
        } else {
        return true;
        }
    });

    const renderItem = ({ item: challenge }) => {
        const handleCheckboxChange = (challenge) => {
            const userId = auth.currentUser.uid;
        
            // Update the state immediately
            setExperiences(experiences.map(experience => {
                if (experience.id === challenge.experienceId) {
                    return {
                        ...experience,
                        future_challenges: experience.future_challenges.map(ch => {
                            if (ch.id === challenge.id) {
                                return { ...ch, isCompleted: !ch.isCompleted };
                            }
                            return ch;
                        }),
                    };
                }
                return experience;
            }));
        
            // Then perform the completeChallenge or incompleteChallenge function
            if (!challenge.isCompleted) {
                completeChallenge(userId, challenge.experienceId, challenge.id);
            } else {
                incompleteChallenge(userId, challenge.experienceId, challenge.id);
            }
        };

        return (
            <Swipeable renderRightActions={() => renderRightAction(challenge.experienceId, challenge.id)} >
                <Card style={styles.challengeContainer}>
                    <View style={styles.challengeHeader}>
                        <Text style={styles.challengeTitle}>{challenge.challenge}</Text>
                        <View style={styles.starGroup}>
                        {[...Array(challenge.challenge_difficulty+1)].map((_, i) => 
                            <Icon name='star' style={styles.starsIcon} fill='#FFD700'/>
                        )}
                        </View>
                    </View>
                    <Text style={styles.challengeDescription}>{challenge.challenge_description}</Text>
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
                {filteredChallenges.length === 0 && (
                    <>
                        <Text style={styles.ChallengesNotFoundText}>No challenges found</Text>
                    </>)}
                <List
                    style={styles.list}
                    data={filteredChallenges}
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
        width: '80%',

    },
    challengeDescription: {
        fontSize: 16,
        color: '#666',
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
    filterIcon: {
        width: 25,
        height: 25,
        marginHorizontal: 40,
        marginVertical: 10,
    },
    filterButton: {
        padding: 10,
        color: 'black',
    },
    starsIcon: {
        color: 'gold',
        width: 25,
        height: 25,
    },
    challengeHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    starGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'right',
        justifyContent: 'flex-end',
        width: '20%',
    }
});

export default ChallengeScreen;