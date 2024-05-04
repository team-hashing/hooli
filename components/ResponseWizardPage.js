import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Icon } from '@ui-kitten/components';

const ResponseWizardPage = ({ data }) => {
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
          flexWrap: 'wrap',
          width: '100%',
          padding: 20,
        },
        subContainer: {
          flex: 1,
          flexWrap: 'wrap',
          width: '100%',
        },
        ResponseMessage: {
            textAlign: 'left',
            color: theme['color-primary-200'],
            fontSize: 20,
            flexWrap: 'wrap',

        },
        ResponseHeader: {
            textAlign: 'left',
            color: theme['color-primary-100'],
            fontSize: 40,
            flexWrap: 'wrap',
            fontWeight: 'bold',
            marginBottom: 20,
        },
        SwipeMessage: {
            textAlign: 'center',
            color: '#D9FFCA',
            fontSize: 15,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
        },
        SwipeContainer: {
            flexDirection: 'row',

        },
      });


  return (
    <Layout style={styles.container}>
      <View style={styles.container} >
        <Text style={styles.ResponseHeader}>YOUR ECO-REVIEW IS READY!</Text>
        <Text style={styles.ResponseMessage}>{datatest.message}</Text>
      </View>
      <View style={styles.SwipeContainer}>
        <Text style={styles.SwipeMessage}>Swipe to see your summary</Text>
        <Icon name='arrow-forward-outline' fill='#D9FFCA' style={{ width: 20, height: 20, marginLeft: 10 }} />
      </View>
    </Layout>
  );
};



export default ResponseWizardPage;