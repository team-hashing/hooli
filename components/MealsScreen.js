import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ActivityIndicator, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function MealsScreen() {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);


	const generateContent = async () => {
		setLoading(true);
		try {
			const userId = '8eo4fLDnMhhodi2mIWsq5i1ahO82';

			const response = await fetch('http://192.168.1.164:3000/generate', {
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
		<View>
			<TextInput
				value={text}
				onChangeText={setText}
				placeholder="Enter text"
				multiline
				numberOfLines={4}
				style={{ height: 100 }}
			/>
			<Button
				title="Generate"
				onPress={generateContent}
				disabled={loading}
			/>
			{loading && <ActivityIndicator size="large" color="#0000ff" />}
			{/*}
			{data && (
				<View>
					<Text>{data.message}</Text>
					{data && data.activities && (
						data.activities.map((activity, index) => (
							<TouchableOpacity key={index}>
								<Text>{activity.activity}</Text>
								<Text>{activity.activity_description}</Text>
								<Text>{activity.feedback_message}</Text>
								<Text>{activity.eco_friendly ? 'Eco-friendly' : 'Not eco-friendly'}</Text>
							</TouchableOpacity>
						))
					)}
					{data && data.future_challenges && (
						data.future_challenges.map((challenge, index) => (
							<TouchableOpacity key={index}>
								<Text>{challenge.challenge}</Text>
								<Text>{challenge.challenge_description}</Text>
								<Text>Difficulty: {challenge.challenge_dificulty}</Text>
							</TouchableOpacity>
						))
					)}
				</View>
			)}
			*/}
		</View>
	);
}