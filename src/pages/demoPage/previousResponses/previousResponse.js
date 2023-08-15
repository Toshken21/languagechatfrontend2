import React, {useState, useEffect} from "react";
import ResponseCSS from "./previousResponse.module.css";
import "../icons/speaker.svg"

const PreviousResponse = (props) => {
    const [response, setResponse] = useState(props.data);
    const [userType, setUserType] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if(response) {
            setUserType(response[0]);
            setContent(response[1]);
        }
    })
    
    const strokeColor = userType === 'user' ? '#fff' : '#000';

    /*const handleOnClick = () => {
        if (gptResponse) {
            fetch(`https://languagechatbackend-f098582e0fd8.herokuapp.com/promptVoice/gptPromptVoice/googleSpeech?text=${encodeURIComponent(gptResponse)}&lang=${encodeURIComponent(voiceLanguage)}`)
            .then(response => response.blob())
            .then(blob => {
              audio.src = URL.createObjectURL(blob);
              audio.play();
            });
        }
      }
    */

    return (
        <div className={`${ResponseCSS["response"]} ${userType === 'user' ? ResponseCSS["user-response"] : ResponseCSS["ai-response"]}`}>
            <div className={ResponseCSS["voice-holder"]}>
            
            
                <h3 className={ResponseCSS["response-h3"]}>{userType}</h3>
                <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" style={{height: "1em", width: "1em"}}>
                    <rect fill="none" />
                    <path d="M218.9,77.1a71.9,71.9,0,0,1,0,101.8" fill="none" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                    <path d="M80,168H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H80l72-56V224Z" fill="none" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                    <line fill="none" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="80" x2="80" y1="88" y2="168"/>
                    <path d="M190.6,105.4a31.9,31.9,0,0,1,0,45.2" fill="none" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
                </svg>
            </div>
            
            <p>{content}</p>
        </div>
    )


}

export default PreviousResponse;