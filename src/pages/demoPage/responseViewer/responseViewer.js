import React, { useEffect, useState } from "react";
import ResponseViewerCSS from "./responseViewer.module.css";

const ResponseViewer = (props) => {
  const [gptResponse, setGptResponse] = useState(props.gptResponse);
  const [voiceLanguage, setVoiceLanguage] = useState(props.language);
  const audio = new Audio();

  useEffect(() => {
    setVoiceLanguage(props.language);
    console.log("This is voice language", voiceLanguage)
  }, [props.language]);

  useEffect(() => {
    setGptResponse(props.gptResponse.content)
  }, [props.gptResponse]);

  useEffect(() => {
    if (gptResponse) {
      fetch(`https://languagechatbackend-f098582e0fd8.herokuapp.com/promptVoice/gptPromptVoice/googleSpeech?text=${encodeURIComponent(gptResponse)}&lang=${encodeURIComponent(voiceLanguage)}`)
        .then(response => response.blob())
        .then(blob => {
          audio.src = URL.createObjectURL(blob);
          audio.play();
        });
    }
  }, [gptResponse]);

  const handleOnClick = () => {
    if (gptResponse) {
        fetch(`https://languagechatbackend-f098582e0fd8.herokuapp.com/promptVoice/gptPromptVoice/googleSpeech?text=${encodeURIComponent(gptResponse)}&lang=${encodeURIComponent(voiceLanguage)}`)
        .then(response => response.blob())
        .then(blob => {
          audio.src = URL.createObjectURL(blob);
          audio.play();
        });
    }
  }

  return (
    <div>
      <h3></h3>
      <p></p>
      {gptResponse && <button onClick={handleOnClick}>Repeat</button>}
    </div>
  );
};

export default ResponseViewer;

