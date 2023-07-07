import React, {useState, useEffect} from "react";

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
    

    return (
        <div>
            <h3>{userType}</h3>
            <p>{content}</p>
        </div>
    )


}

export default PreviousResponse;