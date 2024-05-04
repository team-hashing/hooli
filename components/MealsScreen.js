import React, { useState } from 'react';
import { StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button, Input, Layout, Icon } from '@ui-kitten/components';
import { HOST } from '@env'


const SendIcon = (props) => (
	<Icon {...props} name='paper-plane-outline'/>
);

const MealsScreen = () => {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);


	const generateContent = async () => {
		setLoading(true);
		try {
			const userId = '8eo4fLDnMhhodi2mIWsq5i1ahO82';

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
			<Input
				value={text}
				onChangeText={setText}
				placeholder="Enter text"
				multiline
				numberOfLines={4}
				style={styles.input}
				accessoryRight={() => 
					<Button
					  appearance='filled'
					  accessoryRight={SendIcon}
					  onPress={generateContent}
					  disabled={loading}
					/>
				  }
			/>
			{loading && <ActivityIndicator size="large" color="#0000ff" />}
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},

	input: {
		margin: 10,
		maxHeight: 250,
	},
});

export default MealsScreen;

