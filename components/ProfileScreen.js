import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, Layout, Avatar, Divider, Text, Modal, Card, Input, Icon } from '@ui-kitten/components';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { settings } from 'firebase/analytics';
import { View } from '@gluestack-ui/themed';
  

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(auth.currentUser);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        await auth.currentUser.reload();
        const { displayName, email, photoURL } = auth.currentUser;
        setUser({ displayName, email, photoURL });
      };
  
      fetchUser();
    }, [])
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon name='settings-outline' style={styles.settingsIcon}  status='info' onPress={() => navigation.navigate('ProfileConfig')}/>
      ),
    });
  }, [navigation]);

  return (
    <Layout style={styles.container}>
      <Avatar style={styles.avatar} source={require('../assets/avatar.png')} />
      <Text category='h1' style={styles.text}>{user.displayName}</Text>
      <Text category='s1' style={styles.text}>{user.email}</Text>
      <Divider style={styles.divider} />
      <Layout>
        <View style={styles.rowView}>
        {/* Medals section */}
        <Card style={styles.card}>
          <View style={styles.cardView}>
            <Icon name='award-outline' fill='#ffd700' style={{ width: 25, height: 25 }} />
            <Text category='h6'>123</Text>
          </View>
        </Card>
        {/* Streak section */}
        <Card style={styles.card}>
          <View style={styles.cardView}>
            <Icon name='flash-outline' fill='#EAA24C' style={{ width: 25, height: 25 }} />
            <Text category='h6'>33</Text>
          </View>
        </Card>
        </View>
        <View style={styles.rowView}>
        {/* Points section */}
        <Card style={styles.card}>
          <View style={styles.cardView}>
            <Icon name='trending-up-outline' fill='#EA644C' style={{ width: 25, height: 25 }} />
            <Text category='h6'>1328</Text>
          </View>
        </Card>
        {/* Challenges section */}
        <Card style={styles.card}>
          <View style={styles.cardView}>
            <Icon name='checkmark-circle-outline' fill='#5EB904' style={{ width: 25, height: 25 }} />
            <Text category='h6'>123</Text>
          </View>
        </Card>
        </View>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  text: {
    marginBottom: 15,
  },
  settingsIcon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    margin: 20
  },
  divider: {
    width: '70%',
    marginVertical: 10,
  },
  card: {
    borderRadius: 10,
    width: '40%',
    margin: 10,
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
});

export default ProfileScreen;