import React, { useState, useRef, useEffect } from 'react';
import SpeechToTextComponent from './dictaphone/dictaphone';
import ResponseViewer from './responseViewer/responseViewer';
import PreviousResponse from './previousResponses/previousResponse';
import ReactGA from 'react-ga';

ReactGA.initialize('G-TEP59K5QXD'); // replace 'UA-000000-01' with your actual Tracking ID

function DemoPage() {

  const [recorder, setRecorder] = useState(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [gptResponse, setGptResponse] = useState("");
  const [previousResponsesData, setPreviousResponsesData] = useState([]);
  const [conversationSetting, setConversationSetting] = useState("");
  const [assistantSetting, setAssistantSetting] = useState("");
  const [skillLevelSetting, setSkillLevelSetting] = useState("");
  const [language, setLanguage] = useState("nb-NO");
  const [voice, setVoice] = useState("nb-NO-Standard-A");
  const [inAppBrowser, setInAppBrowser] = useState(false);



  useEffect(() => {
    // Record a pageview for the given page
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []); 

  useEffect(() => {
    const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
    setInAppBrowser(/FBAV|FBAN/i.test(userAgent));
  }, []);


  useEffect(() => {
    switch(language) {
      case "nb-NO":
        setVoice('nb-NO-Standard-A');
        break;
      case "en-US":
        setVoice('en-US-Standard-C');
        break;
      case "fr-FR":
        setVoice('fr-FR-Standard-A');
        break;
      case "de-DE":
        setVoice('de-DE-Standard-A');
        break;
      case "es-ES":
        setVoice('es-ES-Standard-A');
        break;
      case "kr-KR":
        setVoice('ko-KR-Standard-A');
        break;
      default:
        console.log("unsupported language");
    }

  }, [language])
  

  // This function will get the data back from 

  const handleUserPrompt = (data) => {
    console.log("userPrompt data sent to parent component");
    setUserPrompt(data);
  }

  const handleGptQuery = async () => {
    console.log("instance of query start");
    const response = await fetch("https://languagechatbackend-f098582e0fd8.herokuapp.com/gptPrompt/userResponse/add", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
        userPrompt: userPrompt,
        conversationSetting: conversationSetting,
        assistantSetting: assistantSetting,
        skillLevelSetting: skillLevelSetting,
        previousResponses: previousResponsesData,
    })
    });
    console.log(response.body);

    const result = await response.json();

    console.log(result.gptResponse);
    setGptResponse(result.gptResponse);
  }

  useEffect(() => {
    if(userPrompt){
        console.log("This is userprompt ", userPrompt);
        console.log("Instance of request running");
        handleGptQuery();
    }
  }, [userPrompt])

  const handleLanguageSettings = (event) => {
    setLanguage(event.target.value);
    console.log("Handle language settings activated", language);
  }

  const handleConversationSetting = (event) => {
    setConversationSetting(event.target.value);
  }

  const handleAssistantSetting = (event) => {
    setAssistantSetting(event.target.value);
  }

  const handleSkillLevelSetting = (event) => {
    setSkillLevelSetting(event.target.value);
  }

  const handlePreviousResponse = (data) => {
    setPreviousResponsesData([...previousResponsesData, data]);
  }

  useEffect(() => {
    console.log(gptResponse);
    if(gptResponse.content) {
      const response = ["AI", gptResponse.content];
      setPreviousResponsesData(previous => [...previous, response]);
    }

  }, [gptResponse])

  if(inAppBrowser) {
    return(
      <div>
          <h1>Please open this page in Chrome</h1>
          <p>1. Click the three dots icon on the top right.</p>
          <p>2. Click open in Chrome.</p>
      </div>
    )
  }

  return(
    <div>


        <form>
            <label>What language do you want to talk in</label>
            <select id="language" name="language" onChange={handleLanguageSettings}>
              <option value="nb-NO">Norwegian</option>
              <option value="en-US">English</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="es-ES">Spanish</option>
              <option value="ko-KR">Korean</option>
              
            </select>
            <br/>
            <label>Set up conversation setting</label>
            <input type='text' onChange={handleConversationSetting}/>
            <br/>
            <label>Who is your talking partner </label>
            <input type="text" onChange={handleAssistantSetting}/>
            <br/>
            <label>What is your skill Level</label>
            <select id="skill-level" name="skill-level" onChange={handleSkillLevelSetting}>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
            </select>
            
        </form>
        {  previousResponsesData.map((response, index) => (
    <PreviousResponse key={index} data={response} />
    ))} 
        <ResponseViewer gptResponse={gptResponse} handlePreviousResponse={handlePreviousResponse} language={language}/>
        <SpeechToTextComponent handleUserPrompt={handleUserPrompt} 
        skillLevel={skillLevelSetting}
        conversationSetting={conversationSetting} 
        assistantSetting={assistantSetting}
        handlePreviousResponse={handlePreviousResponse}
        language={language} />
        

    </div>
  )
}

export default DemoPage;
