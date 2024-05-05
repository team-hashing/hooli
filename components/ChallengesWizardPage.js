import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { Card } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';

const ChallengesWizardPage = ({ data }) => {
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
        }
      });



  return (
    <Layout style={styles.container}>
        <Text style={styles.ActivitiesHeader}>NEW CHALLENGES</Text>
            <ScrollView style={styles.ActivityView} contentContainerStyle={{justifyContent: 'center'}}>
                    {data.future_challenges.map((challenge, index) => (
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