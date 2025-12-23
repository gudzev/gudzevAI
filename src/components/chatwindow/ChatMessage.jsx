import ReactMarkdown from "react-markdown";

export function ChatMessage({content, role})
{
    let displayImage = (role == "assistant") ? "/images/robot.png" : "/images/human.png";

    return (
            <div className={`message message-${role}`}>
                <img src={displayImage} alt={`${role} avatar`} className="image-avatar"/>
                <div className="message-content">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </div>
    )
}