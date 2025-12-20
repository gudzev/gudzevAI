import "./ChatWindow.css";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ChatMessage } from "./ChatMessage";

export function ChatWindow({isOpen})
{
    const sendMessage = () =>
    {
        console.log("message sent.");
    }

    return (
        <main className={(isOpen == true) ? "" : "reduce-margin"}>
            <div className="main-heading">
                <h1>gudzevAI</h1>
            </div>

            <div className="chat-content">

                <div className="messages">
                    <ChatMessage text="Hello, how may I help you?" sender="robot" />
                    <ChatMessage text="ffff" sender="human" />
                    <ChatMessage text="Hello, how may I help you?" sender="robot" />
                    <ChatMessage text="ffff" sender="human" />
                    <ChatMessage text="ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" sender="robot" />
                    <ChatMessage text="ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" sender="human" />
                    <ChatMessage text="Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?Hello, how may I help you?" sender="robot" />
                </div>


                <div className="text-input-div">
                    <textarea type="text" className="text-input poppins-regular" placeholder="Your message..."/>

                    <div className="send-btn-wrapper">
                        <FontAwesomeIcon icon={faPaperPlane} size="xl" className="fa-icon-header" onClick={sendMessage}/>
                    </div>
                </div>

                <h6>gudzevAI zna da pogreši, pa proverite odgovore.</h6>
            </div>
        </main>
    )
}