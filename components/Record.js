import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from "react-native";
import Voice from "@react-native-voice/voice";


class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: "",
            pitch: "",
            error: "",
            end: "",
            started: false,
            results: [],
            partialResults: [],
        };

        console.log(this.props);

        Voice.onSpeechStart             = this.onSpeechStart;
        Voice.onSpeechRecognized        = this.onSpeechRecognized;
        Voice.onSpeechEnd               = this.onSpeechEnd;
        Voice.onSpeechError             = this.onSpeechError;
        Voice.onSpeechResults           = this.onSpeechResults;
        Voice.onSpeechPartialResults    = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged     = this.onSpeechVolumeChanged;
    }
    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }
    onSpeechStart = (e) => {
        console.log("onSpeechStart: ", e);
        this.setState({
            started: true,
        });
    };
    onSpeechRecognized = (e) => {
        console.log("onSpeechRecognized: ", e);
        this.setState({
            recognized: "√",
        });
    };
    onSpeechEnd = (e) => {
        console.log("onSpeechEnd: ", e);
        this.setState({
            end: "√",
            started: false,
        });
        this.props.onSpeechEnd(this.state.results);
    };
    onSpeechError = (e) => {
        console.log("onSpeechError: ", e);
        this.setState({
            error: JSON.stringify(e.error),
        });
    };
    onSpeechResults = (e) => {
        console.log("onSpeechResults: ", e);
        this.setState({
            results: e.value,
        });
    };
    onSpeechPartialResults = (e) => {
        console.log("onSpeechPartialResults: ", e);
        this.setState({
            partialResults: e.value,
        });
    };
    onSpeechVolumeChanged = (e) => {
        console.log("onSpeechVolumeChanged: ", e);
        this.setState({
            pitch: e.value,
        });
    };
    _startRecognizing = async () => {
        this.setState({
            recognized: "",
            pitch: "",
            error: "",
            started: false,
            results: [],
            partialResults: [],
            end: "",
        });
        try {
            console.log("Started");
            await Voice.start("en-US");
            //await Voice.start("es-ES");
            this.props.onSpeechStart();
        } catch (e) {
            console.error(e);
        }
    };
    _stopRecognizing = async () => {
        try {
            console.log("Stoped");
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };
    _cancelRecognizing = async () => {
        try {
            await Voice.cancel();
        } catch (e) {
            console.error(e);
        }
    };
    _destroyRecognizer = async () => {
        try {
            await Voice.destroy();
        } catch (e) {
            console.error(e);
        }
        this.setState({
            recognized: "",
            pitch: "",
            error: "",
            started: false,
            results: [],
            partialResults: [],
            end: "",
        });
    };
    render() {
        return (
            <View style={styles.container}>
                {this.state.started ? (
                    <TouchableHighlight onPress={this._stopRecognizing}>
                        <View
                            style={{
                                width: 75,
                                height: 75,
                                borderRadius: 75,
                                backgroundColor: "#00A",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {[...Array(3).keys()].map((index) => {
                                return (
                                    <View
                                        key={index}
                                    />
                                );
                            })}
                            <FontAwesome name="microphone-slash" size={24} color="#fff" />
                        </View>
                    </TouchableHighlight>
                ) : (
                    <TouchableHighlight onPress={this._startRecognizing}>
                        <View
                            style={{
                                width: 75,
                                height: 75,
                                borderRadius: 75,
                                backgroundColor: "#0A0",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <FontAwesome name="microphone" size={24} color="#fff" />
                        </View>
                    </TouchableHighlight>
                )}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
    },
    container: {},
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    action: {
        textAlign: "center",
        color: "#0000FF",
        marginVertical: 5,
        fontWeight: "bold",
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
    stat: {
        textAlign: "center",
        color: "#B0171F",
        marginBottom: 1,
    },
});

export default Record;
