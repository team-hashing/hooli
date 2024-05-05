import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { Card } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRef } from 'react';
import { useState, useEffect } from 'react';


const ChallengesWizardPage = ({ data, isActive }) => {
    const theme = useTheme();


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#637C5A',
            padding: 20,
            paddingTop: 40,
            width: '100%',
        },
        ActivityMessage: {
            textAlign: 'left',
            color: '#D9FFCA',
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
            color: theme['color-primary-200'],
            fontSize: 40,
            flexWrap: 'wrap',
            fontWeight: 'bold',
            marginTop: '40%',
        },
        activityContainer: {
            borderRadius: 10,
            backgroundColor: '#7FA074',
            width: '100%',
            padding: 15,
            borderWidth: 3,
            borderColor: '#4E6146',
        },
        outerContainer: {
            padding: 5,
            borderWidth: 4,
            borderColor: '#46583F',
            shadowColor: '#46583F', // This is the color of the shadow
            shadowOffset: { width: 10, height: 10 },
            shadowOpacity: 1.5,
            shadowRadius: 15,
            borderRadius: 16,
            marginVertical: 10,
            backgroundColor: 'transparent',
            elevation: 10,
        },
        ActivityView: {
            width: '100%',
            padding: 20,
            flexGrow: 1,
            maxHeight: '70%'
        },
        ActivityBack: {
            backgroundColor: theme['color-primary-700'],
            borderRadius: 10,
            display: 'block',
            elevation: 3,
        },
        noChallengesMessage: {
            textAlign: 'center',
            color: '#D9FFCA',
            fontSize: 20,
            flexWrap: 'wrap',
            marginTop: 50,
        },
    });


    const viewRefs = useRef([]);
    const titleRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            titleRef.current.jello(2000);
            viewRefs.current.forEach((ref, index) => {
                setTimeout(() => {
                    ref.jello(1500);
                }, 300 * index);
            });
        }
    }, [isActive]);

    return (
        <Layout style={styles.container}>
            <Animatable.Text
                style={styles.ActivitiesHeader}
                ref={titleRef}
            >
                NEW CHALLENGES
            </Animatable.Text>
            <ScrollView style={styles.ActivityView} contentContainerStyle={{ justifyContent: 'center' }}>
                {data && data.future_challenges.length > 0 ? (
                    data.future_challenges.map((challenge, index) => (
                        <Animatable.View
                            ref={(ref) => (viewRefs.current[index] = ref)}
                            delay={200}
                            key={index}
                        >
                            <View style={styles.outerContainer}>
                                <Card style={styles.activityContainer}>
                                    <Text style={styles.ActivityMessage}>
                                        {challenge.challenge_description}
                                    </Text>
                                </Card>
                            </View>
                        </Animatable.View>
                    ))
                ) : (
                    <Animatable.View ref={(ref) => (viewRefs.current[0] = ref)}>
                        <Text style={styles.noChallengesMessage}>Your day did not have challenges to be analyzed... :(</Text>
                    </Animatable.View>
                )}
            </ScrollView>
        </Layout>
    );
};

export default ChallengesWizardPage;