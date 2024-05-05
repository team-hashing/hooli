import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert, Image, FlatList } from 'react-native';
import { Button, Layout, Avatar, Divider, Text, Modal, Card, Input, Icon } from '@ui-kitten/components';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { settings } from 'firebase/analytics';
import { View } from '@gluestack-ui/themed';
import getUserInfo from '../businessLogic/user/getUserInfo';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const ProfileScreen = () => {
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

	const medalDescriptions = {
		"medal_transport": "Awarded for using eco-friendly transportation methods",
		"medal_food": "Earned by making sustainable food choices",
		"medal_energy": "Given for reducing energy consumption",
		"medal_waste": "Achieved by minimizing waste production",
		"medal_water": "Granted for conserving water resources",
		"medal_health": "Received for maintaining a healthy lifestyle",
		"medal_multi_category": "A special medal for excelling in multiple sustainability categories",
		"medal_challenge_master": "For those who have mastered various sustainability challenges",
		"medal_beginner": "A starter medal for those beginning their sustainability journey"
	};

	const medalNames = {
		"medal_transport": "Green Transport Medal",
		"medal_food": "Sustainable Foodie Medal",
		"medal_energy": "Energy Saver Medal",
		"medal_waste": "Waste Warrior Medal",
		"medal_water": "Water Guardian Medal",
		"medal_health": "Health Hero Medal",
		"medal_multi_category": "Multi-Category Champion Medal",
		"medal_challenge_master": "Challenge Master Medal",
		"medal_beginner": "Sustainability Beginner Medal"
	};
	const medalImages = {
		"medal_transport": require('../assets/medals/medal_transport.png'),
		"medal_food": require('../assets/medals/medal_food.png'),
		"medal_energy": require('../assets/medals/medal_energy.png'),
		"medal_waste": require('../assets/medals/medal_waste.png'),
		"medal_water": require('../assets/medals/medal_water.png'),
		"medal_health": require('../assets/medals/medal_health.png'),
		"medal_multi_category": require('../assets/medals/medal_multi_category.png'),
		"medal_challenge_master": require('../assets/medals/medal_challenge_master.png'),
		"medal_beginner": require('../assets/medals/medal_beginner.png'),
		"default": require('../assets/medals/default.png')
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
				<Icon name='settings-outline' style={styles.settingsIcon} status='info' onPress={() => navigation.navigate('ProfileConfig')} />
			),
		});
	}, [navigation]);

	return (
		<Layout style={styles.container}>

			<Avatar style={styles.avatar} source={require('../assets/avatar.png')} />
			<Text category='h1' style={styles.text}>{user.displayName}</Text>
			<Text category='s1' style={styles.text}>{user.email}</Text>
			<Divider style={styles.divider} />
			<Swipeable
				renderRightActions={() => (
					<Layout>
						<FlatList
							data={medals}
							style={styles.flatList}
							renderItem={({ item: medal }) => (
								<TouchableOpacity
									style={styles.item}
									onPress={() => Toast.show({ type: 'info', position: 'bottom', text1: medalNames[medal], text2: medalDescriptions[medal], visibilityTime: 2000 })}
								>
									<Image source={getMedalImage(medal)} style={styles.image} />
								</TouchableOpacity>
							)}
							keyExtractor={(item, index) => index.toString()}
							numColumns={3}
						/>
					</Layout>
				)}
			>
				<Layout>
					<View style={styles.rowView}>
						{/* Medals section */}
						<Card style={styles.card}>
							<TouchableOpacity onPress={() => Toast.show({ type: 'info', position: 'bottom', text1: 'Completed Challenges', visibilityTime: 2000 })}>
								<View style={styles.cardView}>
									<Icon name='checkmark-circle-outline' fill='#5EB904' style={{ width: 25, height: 25 }} />
									<Text category='h6'>{completedChallenges}</Text>
								</View>
							</TouchableOpacity>
						</Card>
						{/* Streak section */}
						<Card style={styles.card}>
							<TouchableOpacity onPress={() => Toast.show({ type: 'info', position: 'bottom', text1: 'Daily Streak', visibilityTime: 2000 })}>
								<View style={styles.cardView}>
									<Icon name='flash-outline' fill='#EAA24C' style={{ width: 25, height: 25 }} />
									<Text category='h6'>{streak}</Text>
								</View>
							</TouchableOpacity>
						</Card>
					</View>
					<View style={styles.rowView}>
						{/* Transport section */}
						<Card style={styles.card}>
							<TouchableOpacity onPress={() => Toast.show({ type: 'info', position: 'bottom', text1: 'Transport Score', visibilityTime: 2000 })}>
								<View style={styles.cardView}>
									<Icon name='car-outline' fill='#EA644C' style={{ width: 25, height: 25 }} />
									<Text category='h6'>{scores.transport}</Text>
								</View>
							</TouchableOpacity>
						</Card>


						{/* Food section */}
						<Card style={styles.card}>
							<TouchableOpacity onPress={() => Toast.show({ type: 'info', position: 'bottom', text1: 'Food Score', visibilityTime: 2000 })}>
								<View style={styles.cardView}>
									<Icon name='shopping-bag-outline' fill='#5EB904' style={{ width: 25, height: 25 }} />
									<Text category='h6'>{scores.food}</Text>
								</View>
							</TouchableOpacity>
						</Card>
					</View>
					<View style={styles.rowView}>
						{/* Energy section */}
						<Card style={styles.card}>
							<TouchableOpacity onPress={() => Toast.show({ type: 'info', position: 'bottom', text1: 'Energy Score', visibilityTime: 2000 })}>
								<View style={styles.cardView}>
									<Icon name='flash-outline' fill='#00A2FF' style={{ width: 25, height: 25 }} />
									<Text category='h6'>{scores.energy}</Text>
								</View>
							</TouchableOpacity>
						</Card>
						{/* Waste section */}
						<Card style={styles.card}>
							<TouchableOpacity onPress={() => Toast.show({ type: 'info', position: 'bottom', text1: 'Waste Score', visibilityTime: 2000 })}>
								<View style={styles.cardView}>
									<Icon name='trash-2-outline' fill='#00d7ff' style={{ width: 25, height: 25 }} />
									<Text category='h6'>{scores.waste}</Text>
								</View>
							</TouchableOpacity>
						</Card>
					</View>
					<View style={styles.rowView}>
						{/* Water section */}
						<Card style={styles.card}>
							<TouchableOpacity onPress={() => Toast.show({ type: 'info', position: 'bottom', text1: 'Water Score', visibilityTime: 2000 })}>
								<View style={styles.cardView}>
									<Icon name='droplet-outline' fill='#4C90EA' style={{ width: 25, height: 25 }} />
									<Text category='h6'>{scores.water}</Text>
								</View>
							</TouchableOpacity>
						</Card>
						{/* Health section */}
						<Card style={styles.card}>
							<TouchableOpacity onPress={() => Toast.show({ type: 'info', position: 'bottom', text1: 'Health Score', visibilityTime: 2000 })}>
								<View style={styles.cardView}>
									<Icon name='heart-outline' fill='#EA4C4C' style={{ width: 25, height: 25 }} />
									<Text category='h6'>{scores.health}</Text>
								</View>
							</TouchableOpacity>
						</Card>
					</View>

					<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
						<Text style={{ fontSize: 60 }}>→</Text>
					</View>
				</Layout>
			</Swipeable>
			<Toast ref={(ref) => Toast.setRef(ref)} />
		</Layout >
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
	flatList: {
		flexGrow: 1,
	},
	item: {
		margin: 5,
	},

	image: {
		width: 50,
		height: 50,
	},

});

export default ProfileScreen;