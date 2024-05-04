// components/SpeechScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Record 					from './Record';

const SpeechComponent = () => {
	const [speechText, setSpeechText] = useState("");
	return (
		<View>
			<View >
				<Text>Speech Text</Text>
				<TextInput
					multiline

					numberOfLines={6}
					value={speechText}
					maxLength={500}
					editable={true}
					style={{
						borderColor: "black",
						borderWidth: 1,
						margin: 10,
						padding: 10,
						textAlignVertical: "top",
						backgroundColor: "#A00",
					}}
				/>
				<View
					style={{
						alignItems: "flex-end",
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Button
						title="Save"
						color={"#007AFF"}
						onPress={async () => {
							console.log("save");
						}}
					/>
					<Button
						title="Clear"
						color={"#007AFF"}
						onPress={() => {
							setSpeechText("");
						}}
					/>
				</View>
			</View>
			<Record
				onSpeechEnd={(value) => {
					setSpeechText(value[0]);
				}}
				onSpeechStart={() => {
					setSpeechText("");
				}}
			/>
		</View>
	);
};

export default SpeechScreen;