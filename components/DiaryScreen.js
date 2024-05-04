import React, { useState } from 'react';
import { StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button, Input, Layout, Icon, Text } from '@ui-kitten/components';
import { HOST } from '@env'
import { auth } from '../firebaseConfig';



const SendIcon = (props) => (
	<Icon {...props} name='paper-plane-outline'/>
);

const DiaryScreen = () => {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);


	const generateContent = async () => {
		setLoading(true);
		try {
			const userId = auth.currentUser.uid;

			const response = await fetch(`http://${HOST}:3000/generate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: text,
					userId: userId,
				}),
			});

			const data = await response.json();
			setData(data);
		} catch (error) {
			Alert.alert('Error', error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Layout style={styles.container}>
			<Layout style={styles.messageContainer}>
				<Text style={styles.message}>Please explain your day</Text>
				<Text style={styles.message}>to become more</Text>
				<Text style={styles.message}>eco-friendly...</Text>
			</Layout>
			{loading && <ActivityIndicator size="large" color="#0000ff" />}
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
		</Layout>
	);
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
		maxHeight: 500,
	},
	messageContainer: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
});

export default DiaryScreen;

