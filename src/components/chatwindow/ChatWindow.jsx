import "./ChatWindow.css";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ChatMessage } from "./ChatMessage";
import { Animate } from "../../utils/animate";

import { useState, useEffect, useRef } from "react";

import axios from "axios";

export function ChatWindow({isOpen, setChats, chats, activeChatID})
{
    const currentChat = chats.find((chat) => chat.ID === activeChatID);

    const [text, setText] = useState("");
    const [textInputEnabled, setTextInputEnabled] = useState(true);

    // Scrolling after user sends a message, saving messages into localStorage
    const lastMessage = useRef(null);
    useEffect(() =>
    {
        localStorage.setItem("userChats", JSON.stringify(chats));
        lastMessage.current?.scrollIntoView();
    }, [chats]);

    // Sending messages
    const sendMessage = async () =>
    {
        if(!text) return;

        let newMessages;
        const newUserMessage =
        {
            content: text,
            role: "user",
            key: crypto.randomUUID(),
        };

        newMessages = [...currentChat.messages, newUserMessage];

        setChats(prev => prev.map((chat) =>
        {
           if(chat.ID === activeChatID)
            {
                chat.messages = newMessages;
            }
            return chat;
        }));
        setText("");
        setTextInputEnabled(false);

        const temporaryMessage =
        {
            content: "gudzevAI is thinking...",
            role: "assistant",
            key: crypto.randomUUID(),
        }

        newMessages = [...newMessages, temporaryMessage];
        setChats(prev => prev.map((chat) =>
        {
            if(chat.ID === activeChatID)
            {
                chat.messages = newMessages;
            }
            return chat;
        }));

        const request = await axios.post("/.netlify/functions/api", 
        {
            messages: newMessages.slice(-5), // Limiting to last 5 messages
        });
        const response = request.data.text;

        newMessages = newMessages.filter((message) => message.key !== temporaryMessage.key);
        setChats(prev => prev.map((chat) =>
        {
            if(chat.ID === activeChatID)
            {
                chat.messages = newMessages;
            }
            return chat;
        }));

        const newRobotMessage =
        {
            content: response,
            role: "assistant",
            key: crypto.randomUUID(),
        }

        newMessages = [...newMessages, newRobotMessage];

        setChats(prev => prev.map((chat) =>
        {
           if(chat.ID === activeChatID)
            {
                chat.messages = newMessages;
            }

            return chat;
        }));

        setTextInputEnabled(true);
    }

    // Saving input text on change
    const saveText = (event) =>
    {
        setText(event.target.value);
    }

    // Enabling sending messages on enter key
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
                    currentChat.messages.map((message) =>
                    {
                        return <Animate duration={.6} key={message.key}><ChatMessage role={message.role} content={message.content} key={message.key} /></Animate>
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