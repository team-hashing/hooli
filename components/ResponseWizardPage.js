import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';

const ResponseWizardPage = ({ data }) => {
    const theme = useTheme();

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
        <Animatable.View animation="fadeInLeft" duration={2000}>
          <Text style={styles.ResponseHeader}>YOUR ECO-REVIEW IS READY!</Text>
        </Animatable.View>
        <Animatable.View animation="fadeInLeft" duration={2000} delay={300}>
          {data && <Text style={styles.ResponseMessage}>{data.message}</Text> }
        </Animatable.View>
      </View>
      <View style={styles.SwipeContainer}>
        <Text style={styles.SwipeMessage}>Swipe to see your summary</Text>
        <Icon name='arrow-forward-outline' fill='#D9FFCA' style={{ width: 20, height: 20, marginLeft: 10 }} />
      </View>
    </Layout>
  );
};



export default ResponseWizardPage;