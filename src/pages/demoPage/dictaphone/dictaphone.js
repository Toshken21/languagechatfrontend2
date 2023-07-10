import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SpeechCSS from "./dictaphone.module.css";

const SpeechToTextComponent = (props) => {

    const [isRecording, setIsRecording] = useState(false);
    const userType = "user"
    const [userTranscript, setUserTranscript] = useState("");
    useEffect(() => {
        if( isRecording=== false && userTranscript){
            props.handleUserPrompt(userTranscript);
            const response = [userType, userTranscript];
            props.handlePreviousResponse(response);
            resetTranscript();
        }

    }, [isRecording, userTranscript]);

    useEffect(() => {
        if(!isRecording){
            setUserTranscript("");
        }
    }, [isRecording])
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <p>Sorry, your browser does not support speech recognition.</p>;
    }

    const startListening = () =>{
        if(userTranscript) {
            const response = [userType, userTranscript];
            props.handlePreviousResponse(response);
            setUserTranscript("");
            

        }
        resetTranscript();
        setIsRecording(true);
        SpeechRecognition.startListening({ continuous: true, language: props.language });
    }  
    const stopListening = async () => {
        setIsRecording(false);
        SpeechRecognition.stopListening();
        setUserTranscript(transcript);
        

    }

    const handleButtonClick = () => {
        if (isRecording) {
            stopListening();
        } else {
            startListening();
        }
    }

    return (
        <div>

            <p>Recording: {listening ? 'Yes' : 'No'}</p>

            <p>{listening ? transcript : ""}</p>
            <button onClick={handleButtonClick}>{isRecording ? "Stop" : "Speak"}</button>
            <button onClick={resetTranscript}>Reset</button>
        </div>
    );
};

export default SpeechToTextComponent;
