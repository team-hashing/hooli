import { Layout, Text } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Icon, Card } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import { useRef, useEffect, useState } from 'react';

const ResponseWizardPage = ({ data, isActive }) => {
	const [showShield, setShowShield] = useState(false);

	const theme = useTheme();
	const headerRef = useRef(null);
	const messageRef = useRef(null);

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
		cardStreak: {
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: 30,
			backgroundColor: 'transparent',
			borderColor: 'transparent',
			borderRadius: 10,
		},
		viewShield: {
			backgroundColor: '#637C5A',
			alignItems: 'center',
			justifyContent: 'center',
		},
		StreakText: {
			color: '#D9FFCA',
		},
	});


	useEffect(() => {
		if (isActive) {
			headerRef.current.fadeInLeft(2000);
			messageRef.current.fadeInLeft(3000);        
			setTimeout(() => {
				setShowShield(true);
			}, 2700);

		}
        else {
            headerRef.current.fadeOutLeft(200);
            messageRef.current.fadeOutLeft(200);
			setShowShield(false);

        }
		
	}, [isActive]);

	return (
		<Layout style={styles.container}>
			<View style={styles.container} >
				<Animatable.View ref={headerRef}>
					<Text style={styles.ResponseHeader}>YOUR ECO-REVIEW IS READY!</Text>
				</Animatable.View>
				<Animatable.View ref={messageRef}>
					{isActive &&  data && <Text style={styles.ResponseMessage}>{data.message}</Text>}
				</Animatable.View>

				<Card style={styles.cardStreak}>
					<Text style={styles.StreakText}>Streak</Text> 
					<View style={styles.viewShield}>
						{showShield ? (
							<Animatable.View animation="fadeIn">
								<Icon name='shield' fill='#D9FFCA' style={{ width: 20, height: 20, marginTop: 10 }} />
							</Animatable.View>
						) : (
							<Icon name='shield-outline' fill='#D9FFCA' style={{ width: 20, height: 20, marginTop: 10 }} />
						)}
					</View>
				</Card>
			</View>
			<View style={styles.SwipeContainer}>
				<Text style={styles.SwipeMessage}>Swipe to see your summary</Text>
				<Icon name='arrow-forward-outline' fill='#D9FFCA' style={{ width: 20, height: 20, marginLeft: 10 }} />
			</View>
		</Layout>
	);
};



export default ResponseWizardPage;