import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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
            resetTranscript();

        }
        setIsRecording(true);
        SpeechRecognition.startListening({ continuous: true, language: props.language });
    }  
    const stopListening = async () => {
        setIsRecording(false);
        SpeechRecognition.stopListening();
        setUserTranscript(transcript);

    }


    return (
        <div>
            
            <button onClick={startListening}>Speak</button>
            <button onClick={stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>Listening: {listening ? 'Yes' : 'No'}</p>
            <p>{transcript}</p>
        </div>
        );
    };

export default SpeechToTextComponent;
