/*import React, {useState, useEffect} from "react";

const ChatSuggestion = (props) => {
    const [suggestion, setSuggestion] = useState(props.data);
    
    const [language, setLanguage] = useState(props.language);
    const [isEngaged, setIsEngaged] = useState(false);
    const audio = new Audio();
    
    
    useEffect(() => {
        if(isEngaged) {

            fetch(`https://languagechatbackend-76d135063e5f.herokuapp.com/promptVoice/gptPromptVoice/googleSpeech?text=${encodeURIComponent(suggestion[1])}&lang=${encodeURIComponent(language)}`)
                .then(response => response.blob())
                .then(blob => {
                   audio.src = URL.createObjectURL(blob);
                   audio.play();
                    });
                

        }
    }, [isEngaged]);

    const handleVoiceClick = () => {
        fetch(`https://languagechatbackend-76d135063e5f.herokuapp.com/promptVoice/gptPromptVoice/googleSpeech?text=${encodeURIComponent(suggestion[1])}&lang=${encodeURIComponent(language)}`)
        .then(response => response.blob())
        .then(blob => {
           audio.src = URL.createObjectURL(blob);
           audio.play();
            });
    }

    const handleDivClick = () => {
        if(isEngaged) {
            setIsEngaged(false);
        } else {
            setIsEngaged(true);
        }
    }

    

    return (
        <div onClick={handleDivClick}>
            <h3>{isEngaged ? suggestion[1] : suggestion[0]}</h3>
            <button onClick={handleVoiceClick}>Repeat</button>
        </div>
    )

}



export default ChatSuggestion;
*/