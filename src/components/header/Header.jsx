import "./Header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMessage } from "@fortawesome/free-solid-svg-icons";

export function Header({isOpen, setIsOpen})
{
    const toggleIsOpen = () =>
    {
        setIsOpen(prev => !prev);
    }
    
    return (
        <header className={isOpen ? "header open" : "header closed"}>
            <nav>

                <div className="menu-row">
                    <FontAwesomeIcon icon={faBars} size="xl" className="fa-icon-header" onClick={toggleIsOpen}/>
                </div>

                <ul>
                    <li><a><FontAwesomeIcon icon={faMessage} size="xl" className="fa-icon-header" /><span className="option-text">New Chat</span></a></li>
                </ul>

                <ul className={`chat-list display-chats-${isOpen}`}>
                    <h3>Your Chats</h3>
                    <li><a>Razgovor 1</a></li>
                    <li><a>Razgovor 2</a></li>
                    <li><a>Razgovor 3</a></li>
                </ul>
            </nav>
        </header>
    )
}