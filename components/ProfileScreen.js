import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import { Layout, Avatar, Divider, Text, Card, Icon } from '@ui-kitten/components';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { View } from '@gluestack-ui/themed';
import getUserInfo from '../businessLogic/user/getUserInfo';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { allMedals, medalDescriptions, medalNames, medalImages } from '../businessLogic/medalData';
import { Dimensions } from 'react-native';
import { useTheme } from '@ui-kitten/components';

const { width } = Dimensions.get('window');


const ProfileScreen = () => {
	const theme = useTheme();
	const navigation = useNavigation();
	const [user, setUser] = useState(auth.currentUser);
	const [streak, setStreak] = useState(0);
	const [scores, setScores] = useState({
		transport: 0,
		food: 0,
		energy: 0,
		waste: 0,
		water: 0,
		health: 0,
	});
	const [completedChallenges, setcompletedChallenges] = useState(0);
	const [medals, setMedals] = useState([]);
	const [scrollPosition, setScrollPosition] = useState(0);
	let totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

	const handleScroll = (event) => {
	  const position = event.nativeEvent.contentOffset.x;
	  setScrollPosition(Math.round(position / width));
	};

	const getMedalImage = (medalName) => {
		return medalImages[medalName] || medalImages["default"];
	};
	useFocusEffect(
		React.useCallback(() => {
			const fetchUser = async () => {
				await auth.currentUser.reload();
				const { displayName, email, photoURL } = auth.currentUser;
				setUser({ displayName, email, photoURL });

				// Fetch user info
				const info = await getUserInfo(auth.currentUser.uid);
				setStreak(info.streak);
				setScores(info.scores);
				setcompletedChallenges(info.completedChallenges);
				setMedals(info.medals);
			};

			fetchUser();
		}, [])
	);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Icon name='settings-outline' style={styles.settingsIcon} status='success' onPress={() => navigation.navigate('ProfileConfig')} />
			),
		});
	}, [navigation]);

	return (
		<Layout style={styles.container}>
			<Avatar style={styles.avatar} source={require('../assets/avatar.png')} />
			<Text category='h1' style={styles.text}>{user.displayName}</Text>
			<Text category='s1' style={styles.text}>{user.email}</Text>
			<Divider style={styles.divider} />
			<View style={styles.ProfileAccomplishments}>
				
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<View style={{ 
					width: 50, 
					height: 3 , 
					margin: 5, 
					backgroundColor: scrollPosition === 0 ? theme['color-primary-500'] : 'gray',
					borderRadius: 5
					
					}} />
					<View style={{ 
					width: 50, 
					height: 3 ,
					margin: 5, 
					backgroundColor: scrollPosition === 1 ? theme['color-primary-500'] : 'gray',
					borderRadius: 5
					}} />
				</View>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					pagingEnabled={true}
					onScroll={handleScroll}
					scrollEventThrottle={16}>
					<View style={styles.view} >
						<View style={styles.rowView}>
							{/* Medals section */}
							<Card style={styles.card}>
								<TouchableOpacity onPress={() => Toast.show({ type: 'success', position: 'bottom', bottomOffset: 20, text1: 'Challenges Completed', visibilityTime: 2000 })}>
									<View style={styles.cardView}>
										<Icon name='checkmark-circle-outline' fill='#5EB904' style={{ width: 25, height: 25 }} />
										<Text category='h6'>{completedChallenges}</Text>
									</View>
								</TouchableOpacity>
							</Card>
							{/* Streak section */}
							<Card style={styles.card}>
								<TouchableOpacity onPress={() => Toast.show({ type: 'success', position: 'bottom', bottomOffset: 20, text1: 'Daily Streak', visibilityTime: 2000 })}>
									<View style={styles.cardView}>
										<Icon name='shield-outline' fill='#EAA24C' style={{ width: 25, height: 25 }} />
										<Text category='h6'>{streak}</Text>
									</View>
								</TouchableOpacity>
							</Card>
						</View>
						<View style={styles.rowView}>

							<Card style={styles.card}>
								<TouchableOpacity onPress={() => Toast.show({ type: 'success', position: 'bottom', bottomOffset: 20, text1: 'Total Score', visibilityTime: 2000 })}>
									<View style={styles.cardView}>
										<Icon name='trending-up-outline' fill='#EAA24C' style={{ width: 25, height: 25 }} />
										<Text category='h6'>{totalScore}</Text>
									</View>
								</TouchableOpacity>
							</Card>
							<View style={{width: '50%', flexDirection: 'row'}}>
							{/* Transport section */}
							<Card style={styles.card}>
								<TouchableOpacity onPress={() => Toast.show({ type: 'success', position: 'bottom', bottomOffset: 20, text1: 'ECO-Transport Score', visibilityTime: 2000 })}>
									<View style={styles.cardView}>
										<Icon name='car-outline' fill='#EA644C' style={{ width: 25, height: 25 }} />
										<Text category='h6'>{scores.transport}</Text>
									</View>
								</TouchableOpacity>
							</Card>


							{/* Food section */}
							<Card style={styles.card}>
								<TouchableOpacity onPress={() => Toast.show({ type: 'success', position: 'bottom', bottomOffset: 20, text1: 'Food Waste Avoided Score', visibilityTime: 2000 })}>
									<View style={styles.cardView}>
										<Icon name='shopping-bag-outline' fill='#5EB904' style={{ width: 25, height: 25 }} />
										<Text category='h6'>{scores.food}</Text>
									</View>
								</TouchableOpacity>
							</Card>
							</View>
						</View>
						<View style={styles.rowView}>
							{/* Energy section */}
							<Card style={styles.card}>
								<TouchableOpacity onPress={() => Toast.show({ type: 'success', position: 'bottom', bottomOffset: 20, text1: 'Energy Saving Score', visibilityTime: 2000 })}>
									<View style={styles.cardView}>
										<Icon name='flash-outline' fill='#00A2FF' style={{ width: 25, height: 25 }} />
										<Text category='h6'>{scores.energy}</Text>
									</View>
								</TouchableOpacity>
							</Card>
							{/* Waste section */}
							<Card style={styles.card}>
								<TouchableOpacity onPress={() => Toast.show({ type: 'success', position: 'bottom', bottomOffset: 20, text1: 'Waste Reduced Score', visibilityTime: 2000 })}>
									<View style={styles.cardView}>
										<Icon name='trash-2-outline' fill='#00d7ff' style={{ width: 25, height: 25 }} />
										<Text category='h6'>{scores.waste}</Text>
									</View>
								</TouchableOpacity>
							</Card>
							{/* Water section */}
							<Card style={styles.card}>
								<TouchableOpacity onPress={() => Toast.show({ type: 'success', position: 'bottom', bottomOffset: 20, text1: 'Water Saving Score', visibilityTime: 2000 })}>
									<View style={styles.cardView}>
										<Icon name='droplet-outline' fill='#4C90EA' style={{ width: 25, height: 25 }} />
										<Text category='h6'>{scores.water}</Text>
									</View>
								</TouchableOpacity>
							</Card>
							{/* Health section */}
							<Card style={styles.card}>
								<TouchableOpacity onPress={() => Toast.show({ type: 'success', position: 'bottom', bottomOffset: 20, text1: 'Healthy Lifestyle Score', visibilityTime: 2000 })}>
									<View style={styles.cardView}>
										<Icon name='heart-outline' fill='#EA4C4C' style={{ width: 25, height: 25 }} />
										<Text category='h6'>{scores.health}</Text>
									</View>
								</TouchableOpacity>
							</Card>
						</View>
					</View>
					<View style={styles.view} >
						<Text category='h4' style={{ textAlign: 'center', marginBottom: 10 }}>Medals</Text>
						<FlatList
							data={allMedals}
							style={styles.flatList}
							contentContainerStyle={{
							  alignItems: 'center',
							  justifyContent: 'center',
							}}
							renderItem={({ item: medal }) => (
								<TouchableOpacity
									onPress={() => Toast.show({ type: 'success', position: 'bottom', bottomOffset: 20, text1: medalNames[medal], text2: medalDescriptions[medal], visibilityTime: 2000 })}
								>
									<Image source={getMedalImage(medal)} style={medals.includes(medal) ? styles.image : styles.imageGrey}/>
								</TouchableOpacity>
							)}
							keyExtractor={(item, index) => index.toString()}
							numColumns={3}
						/>
					</View>
				</ScrollView>
			</View>
			<Toast ref={(ref) => Toast.setRef(ref)}/>
		</Layout >
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
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
		flex: 1,
		margin: 5,
	},
	cardView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	rowView: {
		flexDirection: 'row',
		width: '100%',
	},
	flatList: {
		flexGrow: 1,
		width: '100%',
	},

	image: {
		width: 70,
		height: 70,
		margin: 5,
	},
	imageGrey: {
		width: 70,
		height: 70,
		margin: 5,
		grayscale: 1,
		tintColor: "gray",
		opacity: 0.5,
	},
	view: {
		flexGrow: 1,
		width,
		padding: 10,
	},
	ProfileAccomplishments: {
		flex: 1,
		width: '100%',
	}

});

export default ProfileScreen;