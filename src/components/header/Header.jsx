import "./Header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Animate } from "../../utils/animate";

import { useEffect } from "react";

export function Header({isOpen, setIsOpen, chats, setChats, chatCounter, setChatCounter, setActiveChatID, activeChatID})
{
    useEffect(() =>
    {
        localStorage.setItem("userChats", JSON.stringify(chats));
    }, [chats]);
    
    const toggleIsOpen = () =>
    {
        setIsOpen(prev => !prev);
    }

    const closeMenu = () =>
    {
        // Sidebar shouldn't be closed on desktop after a click
        if(window.innerWidth <= 768)
        {
            setIsOpen(false);
        }
    }

    const addNewChat = () =>
    {
        const newChat =
        {
            ID: crypto.randomUUID(),
            messages: [],
            name: "Chat" + ' ' + chatCounter.toString(),
        };

        setChatCounter(prev => prev + 1);
        setChats(prev => [...prev, newChat]);
        setActiveChatID(newChat.ID);
        closeMenu();
    }

    const loadChat = (chatID) =>
    {
        setActiveChatID(chatID);
    }
    
    return (
        <header className={isOpen ? "open" : "closed"}>
            <nav>

                <div className="menu-row">
                    <FontAwesomeIcon icon={faBars} size="xl" className="fa-icon-header" onClick={toggleIsOpen}/>
                    <h2 className="mobile-heading-nav">gudzevAI</h2>
                </div>

                <ul className="new-message-row">
                    <li><a onClick={addNewChat}><FontAwesomeIcon icon={faMessage} size="xl" className="fa-icon-header" /><span className={`option-text display-chats-${isOpen}`}>New Chat</span></a></li>
                </ul>

                <ul className={`chat-list display-chats-${isOpen}`}>
                    <h3>Your Chats</h3>
                    {
                        chats.map((chat) =>
                        {
                            return <li className={ chat.ID === activeChatID ? "active-chat" : ""} key={chat.ID} onClick={() => loadChat(chat.ID)}><a>{chat.name}</a></li>
                        })
                    }
                </ul>
            </nav>
        </header>
    )
}