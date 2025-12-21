import "./ChatWindow.css";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ChatMessage } from "./ChatMessage";
import { Animate } from "../../utils/animate";

import { useState, useEffect, useRef } from "react";

import axios from "axios";

export function ChatWindow({isOpen, messages, setMessages})
{
    const [text, setText] = useState("");
    const [textInputEnabled, setTextInputEnabled] = useState(true);

    // Setting messages in local storage
    useEffect(() =>
    {
        localStorage.setItem("userMessages", JSON.stringify(messages));
    }, [messages]);

    // Scrolling after user sends a message
    const lastMessage = useRef(null);
    useEffect(() =>
    {
        lastMessage.current.scrollIntoView();
    }, [messages]);

    // Sending messages
    const sendMessage = async () =>
    {
        if(!text) return;

        const newUserMessage =
        {
            text: text,
            sender: "human",
            key: crypto.randomUUID(),
        };

        setMessages(prev => [...prev, newUserMessage]);
        setText("");
        setTextInputEnabled(false);

        const request = await axios.post("/.netlify/functions/api", 
        {
                message: newUserMessage.text,
        });
        const response = request.data.text;

        const newRobotMessage =
        {
            text: response,
            sender: "robot",
            key: crypto.randomUUID(),
        }

        setMessages(prev => [...prev, newRobotMessage]);
        setTextInputEnabled(true);
    }

    // Saving input text on change
    const saveText = (event) =>
    {
        setText(event.target.value);
    }

    // Enabling sending messages on enter
    const handleKey = (event) =>
    {
        if(event.key == "Enter" && !event.shiftKey)
        {
            event.preventDefault();
            sendMessage();
        }
    }

    return (
        <main className={(isOpen == true) ? "" : "reduce-margin"}>
            <div className="main-heading">
                <Animate duration={1} >
                    <h1>gudzevAI</h1>
                </Animate>
            </div>

            <div className="chat-content">

                <div className="messages">
                {
                    messages?.map((message) =>
                    {
                        return <Animate duration={.6} key={message.key}><ChatMessage sender={message.sender} text={message.text} key={message.key} /></Animate>
                    })
                }

                    <div ref={lastMessage}></div>
                </div>


                <Animate duration={1}>
                    <div className={`text-input-div text-input-enabled-${textInputEnabled}`}>
                        <textarea
                        type="text"
                        className="text-input poppins-regular"
                        placeholder="Your message..."
                        onChange={saveText}
                        onKeyDown={handleKey}
                        value={text}
                        disabled={!textInputEnabled}/>

                        <div className="send-btn-wrapper">
                            <FontAwesomeIcon icon={faPaperPlane} size="xl" className="fa-icon-header send-btn" onClick={sendMessage} />
                        </div>
                    </div>
                </Animate>

                <h6>gudzevAI zna da pogreši, pa proverite odgovore.</h6>
            </div>
        </main>
    )
}