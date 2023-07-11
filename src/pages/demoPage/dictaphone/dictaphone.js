import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SpeechCSS from "./dictaphone.module.css";

const MicrophoneSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v4m-6 0a6 6 0 0012 0m-6 0H6m6 0h6" />
    </svg>
  );
  

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
        <div className={SpeechCSS["speech-holder"]}>

            <p>Recording:</p>

            <p className={SpeechCSS["transcript-reader"]}>{listening ? transcript : ""}</p>
            <button className={SpeechCSS["speech-button"]} onClick={handleButtonClick}>{isRecording ? "Stop" : "Speak"}</button>
            <button  onClick={resetTranscript}>Reset</button>
        </div>
    );
};

export default SpeechToTextComponent;
