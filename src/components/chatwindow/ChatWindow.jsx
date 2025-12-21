import "./ChatWindow.css";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ChatMessage } from "./ChatMessage";

import { useState, useEffect, useRef } from "react";

export function ChatWindow({isOpen, messages, setMessages})
{
    const [text, setText] = useState("");

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
    const sendMessage = () =>
    {
        if(!text) return;

        const newMessage =
        {
            text: text,
            sender: "human",
            key: crypto.randomUUID(),
        };

        setMessages(prev => [...prev, newMessage])
        setText("");
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
                <h1>gudzevAI</h1>
            </div>

            <div className="chat-content">

                <div className="messages">
                {
                    messages?.map((message) =>
                    {
                        return <ChatMessage sender={message.sender} text={message.text} key={message.key} />
                    })
                }

                    <div ref={lastMessage}></div>
                </div>


                <div className="text-input-div">
                    <textarea type="text" className="text-input poppins-regular" placeholder="Your message..." onChange={saveText} onKeyDown={handleKey} value={text}/>

                    <div className="send-btn-wrapper">
                        <FontAwesomeIcon icon={faPaperPlane} size="xl" className="fa-icon-header" onClick={sendMessage} />
                    </div>
                </div>

                <h6>gudzevAI zna da pogreši, pa proverite odgovore.</h6>
            </div>
        </main>
    )
}