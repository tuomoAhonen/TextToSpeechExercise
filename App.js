import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Speech from 'expo-speech';

export default function App() {
	const [voiceList, setVoiceList] = useState([]);
	const [selectedVoice, setSelectedVoice] = useState(undefined);
	const [text, setText] = useState('');

	const handleTextInput = () => {
		// do something
		(async () => {
			//console.log('hello');
			try {
				const isSpeaking = await Speech.isSpeakingAsync();
				//console.log(isSpeaking);
				if (isSpeaking) return;

				return Speech.speak(text, {
					//language: 'en',
					pitch: 1,
					rate: 1,
					volume: 1,
					voice: selectedVoice,
					//onStart: () => ,
					//onDone: () => ,
					onError: (error) => console.log(error),
				});
			} catch (error) {
				return console.log(error);
			}
		})();
	};

	useEffect(() => {
		(async () => {
			try {
				const result = await Speech.getAvailableVoicesAsync();
				//console.log(result);
				setVoiceList(result);
			} catch (error) {
				return console.log(error);
			}
		})();
	}, []);

	//console.log(voiceList);

	return (
		<View style={styles.container}>
			<TextInput
				placeholder='Write anything in english...'
				value={text}
				onChangeText={(e) => setText(e)}
				style={styles.textInput}
			/>
			{voiceList && voiceList.length > 0 && (
				<View style={styles.pickerView}>
					<Picker
						selectedValue={selectedVoice}
						onValueChange={(itemValue, itemIndex) => setSelectedVoice(itemValue)}
						style={styles.picker}
					>
						{voiceList.map((voice, index) => (
							<Picker.Item key={index} label={voice.language} value={voice.identifier} />
						))}
					</Picker>
				</View>
			)}
			<View style={styles.buttonView}>
				<Button title='Press to hear the text as in speech' onPress={handleTextInput} />
			</View>

			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textInput: {
		width: 300,
		marginBottom: 10,
		paddingLeft: 5,
		borderWidth: 2,
		borderColor: '#000000',
		fontSize: 20,
	},
	pickerView: {
		width: 300,
		marginBottom: 10,
		overflow: 'hidden',
		borderWidth: 2,
		borderColor: '#000000',
	},
	picker: {
		width: 300,
		fontSize: 20,
	},
	buttonView: {
		//flex: 1,
	},
});

