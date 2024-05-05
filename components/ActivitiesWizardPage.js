import React from 'react';
import { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { Card } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useRef } from 'react';


const ActivitiesWizardPage = ({ data, isActive }) => {
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
            elevation: 3,
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
    });


    useEffect(() => {
        if (isActive) {
            titleRef.current.tada(2000);
            viewRefs.current.forEach((ref, index) => {
                setTimeout(() => {
                    ref.wobble(2000);
                }, index * 100); // Delay of 100ms per item
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
                {isActive && data && data.activities.length > 0 ? (
                    data.activities.map((activity, index) => (
                        <Animatable.View
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
                    <Animatable.View
                        ref={(ref) => (viewRefs.current[0] = ref)}
                    >
                        <Text style={styles.noActivitiesMessage}>Your day did not have activities to be analyzed... :(</Text>
                    </Animatable.View>
                )}
            </ScrollView>
        </Layout>
    );
};

export default ActivitiesWizardPage;