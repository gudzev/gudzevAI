import "./Header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Animate } from "../../utils/animate";

export function Header({isOpen, setIsOpen})
{
    const toggleIsOpen = () =>
    {
        setIsOpen(prev => !prev);
    }

    const closeMenu = () =>
    {
        // Sidebar shouldn't be closed on desktop after click
        if(window.innerWidth <= 768)
        {
            setIsOpen(false);
        }
    }
    
    return (
        <header className={isOpen ? "open" : "closed"}>
            <nav>

                <div className="menu-row">
                    <FontAwesomeIcon icon={faBars} size="xl" className="fa-icon-header" onClick={toggleIsOpen}/>
                    <h2 className="mobile-heading-nav">gudzevAI</h2>
                </div>

                <ul className="new-message-row">
                    <li><a onClick={closeMenu}><FontAwesomeIcon icon={faMessage} size="xl" className="fa-icon-header" /><span className={`option-text display-chats-${isOpen}`}>New Chat</span></a></li>
                </ul>

                <ul className={`chat-list display-chats-${isOpen}`}>
                    <h3>Your Chats</h3>
                    {
                        /*
                        chats?.map((chat) =>
                        {
                            return <li key={chat.ID}><a onClick={closeMenu}>{chat.name}</a></li>
                        })
                        */
                    }
                </ul>
            </nav>
        </header>
    )
}