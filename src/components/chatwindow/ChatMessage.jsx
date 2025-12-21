import ReactMarkdown from "react-markdown";

export function ChatMessage({text, sender})
{
    let displayImage = (sender == "robot") ? "/images/robot.png" : "/images/human.png";

    return (
            <div className={`message message-${sender}`}>
                <img src={displayImage} alt={`${sender} avatar`} className="image-avatar"/>
                <div className="message-content">
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
            </div>
    )
}