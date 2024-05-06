import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button, Input, Layout, Icon, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import ButtonToSpeak from './ButtonToSpeak';
import SpeechComponent from './SpeechComponent';
import Toast from 'react-native-toast-message';


const SendIcon = (props) => (
	<Icon {...props} name='paper-plane-outline' />
);

const DiaryScreen = (props) => {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);

	const navigation = useNavigation();
	useEffect(() => {
		const params = props.route.params; 
		if (params && params.error) {
			Toast.show({
				type: 'error',
				position: 'top',
				text1: 'Error',
				text2: 'There was an error generating the content.',
			});
		}
	}, [props]);

	const generateContent = async () => {
		textCopy = text;
		setText('');
		navigation.navigate('Wizard', { text: textCopy });
	};

	const speech = (
		<>
			<SpeechComponent />
		</>
	);

	const diary = (
		<Layout style={styles.container}>
			<Layout style={styles.messageContainer}>
				<Text style={styles.message}>Please explain your day</Text>
				<Text style={styles.message}>to become more</Text>
				<Text style={styles.message}>eco-friendly...</Text>
			</Layout>
			<ButtonToSpeak/>
			{data && <Text>{data.message}</Text>}
			<Layout style={styles.inputContainer}>
				<Input
					value={text}
					onChangeText={setText}
					placeholder="Enter text"
					multiline
					style={styles.input}
					accessoryRight={() =>
						<Button
							appearance='filled'
							accessoryRight={SendIcon}
							onPress={generateContent}
							disabled={loading}
							style={styles.sendButton}
						/>
					}
				/>

			</Layout>
			<Toast/>
		</Layout>
	);

	return diary;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	message: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'left',
		color: '#9BBD8E',
	},
	sendButton: {
		marginRight: 10,
		borderRadius: 50,
	},
	inputContainer: {
		marginBottom: 30,
		width: '100%',
	},
	input: {
		flexGrow: 1,
		margin: 20,
		borderRadius: 20,
		maxHeight: 450,
	},
	messageContainer: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
});

export default DiaryScreen;

