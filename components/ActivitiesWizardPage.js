import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { Card } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native-gesture-handler';


const ActivitiesWizardPage = ({ data }) => {
    const theme = useTheme();


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
      });



  return (
    <Layout style={styles.container}>
        <Text style={styles.ActivitiesHeader}>YOUR DAILY ACTIVITIES</Text>

            <ScrollView style={styles.ActivityView}>
                    {data.activities.map((activity, index) => (
                        <Card key={index} style={styles.activityContainer}>
                            <Text style={styles.ActivityMessage}>
                            {activity.activity}
                            </Text>
                        </Card>
                    ))}
            </ScrollView>
    </Layout>
  );
};



export default ActivitiesWizardPage;