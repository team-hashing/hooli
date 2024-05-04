import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { Card } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';

const ChallengesWizardPage = ({ data }) => {
    const theme = useTheme();
    const datatest = {
        message: "Today you've made several great eco-friendly choices! Your dedication to reducing waste and supporting local farmers is admirable. Keep up the fantastic work!",
        activities: [
          {
            activity: 'Made breakfast at home instead of grabbing something disposable',
            activity_description: 'Reduced single-use waste by making breakfast at home.',
            feedback_message: 'This is a great way to reduce waste and save money!',
            eco_friendly: true
          },
          {
            activity: 'Used reusable mug for tea',
            activity_description: 'Used a reusable mug instead of disposable cups for tea.',
            feedback_message: 'A fantastic way to reduce waste!',
            eco_friendly: true
          },
          {
            activity: 'Packed lunch in reusable containers',
            activity_description: 'Packed lunch in reusable containers instead of using single-use plastic bags or wraps.',
            feedback_message: 'This is a great way to reduce waste and save money!',
            eco_friendly: true
          },
          {
            activity: 'Forgot reusable grocery bags, but used reusable produce bags',
            activity_description: 'Forgot reusable grocery bags but remembered to bring reusable produce bags.',
            feedback_message: 'While unfortunately forgetting the reusable grocery bags, using reusable produce bags is still a great way to reduce waste!',
            eco_friendly: true
          },
          {
            activity: 'Bought local and seasonal groceries',
            activity_description: 'Purchased local and seasonal groceries to reduce carbon footprint.',
            feedback_message: 'This is a fantastic way to support local farmers and reduce your carbon footprint!',
            eco_friendly: true
          },
          {
            activity: 'Fixed bike and will use it for short trips',
            activity_description: 'Fixed bike and plans to use it for short trips instead of taking the bus.',
            feedback_message: 'This is a fantastic way to reduce your carbon footprint and get exercise!',
            eco_friendly: true
          },
          {
            activity: 'Ordered takeout in recycled containers and composted food scraps',
            activity_description: 'Ordered takeout in recycled containers and committed to composting food scraps.',
            feedback_message: "While takeout isn't always the most eco-friendly option, using recycled containers and composting food scraps definitely helps lessen the impact!",
            eco_friendly: true
          }
        ],
        future_challenges: [
          {
            challenge: 'Remember reusable grocery bags',
            challenge_description: 'Make a conscious effort to always bring reusable grocery bags to the store to avoid relying on disposable plastic ones.',
            challenge_difficulty: 1
          },
          {
            challenge: 'Convince Sarah to carpool',
            challenge_description: 'Talk to Sarah about the possibility of carpooling to work together to reduce fuel consumption and emissions.',
            challenge_difficulty: 2
          }
        ]
      };


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
            flex: 1,
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
        },
        ActivityBack: {
            backgroundColor: theme['color-primary-700'],
            borderRadius: 10,
            display: 'block',
            elevation: 3,
        }
      });



  return (
    <Layout style={styles.container}>
        <Text style={styles.ActivitiesHeader}>NEW CHALLENGES</Text>
            <ScrollView style={styles.ActivityView} contentContainerStyle={{justifyContent: 'center'}}>
                    {datatest.future_challenges.map((challenge, index) => (
                        <View style={styles.outerContainer}>
                            <Card key={index} style={styles.activityContainer}>
                                <Text style={styles.ActivityMessage}>
                                {challenge.challenge_description}
                                </Text>
                            </Card>
                        </View>
                    ))}
            </ScrollView>
    </Layout>
  );
};



export default ChallengesWizardPage;