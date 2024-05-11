import React from 'react';
import { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useTheme, Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useRef } from 'react';
import { act } from 'react';


const ActivitiesWizardPage = ({ data, isActive }) => {
    const [currentScore, setCurrentScore] = useState(0);

    const theme = useTheme();
    const viewRefs = useRef([]);
    const titleRef = useRef(null);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme['color-primary-100'],
            flexWrap: 'wrap',
            width: '100%',
            padding: 20,
        },
        ActivityMessage: {
            textAlign: 'left',
            color: theme['color-primary-200'],
            fontSize: 20,
            flexWrap: 'wrap',

        },
        ActivityHeader: {
            textAlign: 'left',
            color: theme['color-primary-600'],
            fontSize: 30,
            flexWrap: 'wrap',
            fontWeight: 'bold',
        },
        ActivitiesHeader: {
            textAlign: 'left',
            color: '#637C5A',
            fontSize: 40,
            flexWrap: 'wrap',
            fontWeight: 'bold',
            marginTop: '40%',
            marginBottom: 50,
        },
        activityContainer: {
            marginVertical: 5,
            borderRadius: 10,
            backgroundColor: '#637C5A',
            margin: 5,
            padding: 10,
        },
        ActivityView: {
            width: '100%',
            height: '100%',
            paddingHorizontal: 20,
            marginBottom: 100,
        },
        noActivitiesMessage: {
            textAlign: 'center',
            color: theme['color-primary-800'],
            fontSize: 20,
            flexWrap: 'wrap',
            marginTop: 50,
        },
        animatedContainer: {   
            opacity: 0,
        },
        pointsText:{
            color: '#637C5A',
        },
        totalPoints: {
            fontSize: 30,
            fontWeight: 'bold',
            color: '#637C5A',
        },
        pointsContainer: {
			backgroundColor: 'transparent',
			borderColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    totalScore = data.activities.reduce((acc, activity) => acc + activity.eco_score, 0);


    useEffect(() => {
        if (isActive) {
            titleRef.current.fadeInDown(1000);
            viewRefs.current.forEach((ref, index) => {
                setTimeout(() => {
                    ref.fadeInUp(2000);
                    ref.delay = 1000;
                }, (index+1) * 300); // Delay of 100ms per item
            });
            setCurrentScore(totalScore-10);

            // Increment current score over time
            let intervalId;
            let intervalTime = 100; // Start with a 100ms interval
            const incrementScore = () => {
                setCurrentScore(prevScore => {
                    if (prevScore < totalScore) {
                        intervalTime += intervalTime/7; // Increase interval time by 10ms
                        clearInterval(intervalId);
                        intervalId = setInterval(incrementScore, intervalTime); // Set new interval with increased time
                        return prevScore + 1; // Increment score
                    } else {
                        clearInterval(intervalId); // Stop incrementing when total score is reached
                        return totalScore; // Ensure score does not exceed total score
                    }
                });
            };
            intervalId = setInterval(incrementScore, intervalTime);

        }
        else {
            titleRef.current.fadeOutUp(300);
            viewRefs.current.forEach((ref, index) => {
                ref.fadeOutDown(200);
            });
        }
    }, [isActive]);


    return (
        <Layout style={styles.container}>
            <Animatable.Text
                style={styles.ActivitiesHeader}
                ref={titleRef}
            >
                YOUR DAILY ACTIVITIES
            </Animatable.Text>
            <ScrollView style={styles.ActivityView}>
                {data && data.activities.length > 0 ? (
                    data.activities.map((activity, index) => (
                        <Animatable.View
                            style={styles.animatedContainer}
                            ref={(ref) => (viewRefs.current[index] = ref)}
                            key={index}
                        >
                            <Card style={styles.activityContainer}>
                                <Text style={styles.ActivityMessage}>
                                    {activity.activity}
                                </Text>
                            </Card>
                        </Animatable.View>
                    ))
                ) : (
                        <Text style={styles.noActivitiesMessage}>Your day did not have activities to be analyzed... :(</Text>
                )}
            </ScrollView>                            
            <Card style={styles.pointsContainer}>
                <Text style={styles.pointsText}>
                    Points
                </Text>
                <Text style={styles.totalPoints}>
                    {currentScore}
                </Text>
            </Card>
        </Layout>
    );
};

export default ActivitiesWizardPage;