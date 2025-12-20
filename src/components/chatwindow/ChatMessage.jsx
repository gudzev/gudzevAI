export function ChatMessage({text, sender})
{
    let displayImage = (sender == "robot") ? "/images/robot.png" : "/images/human.png";

    return (
            <div className={`message message-${sender}`}>
                <img src={displayImage} alt="AI Message" className="image-avatar"/>
                <p>
                    {text}
                </p>
            </div>
    )
}