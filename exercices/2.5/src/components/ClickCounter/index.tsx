import { useState } from 'react'

interface ClickCounterProps {
    title: string;
    messageHover?: string;
    message10Clicks?: string;
}

const ClickCounter = ({ title, messageHover, message10Clicks }: ClickCounterProps) => {
    const [count, setCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <header>
            <h1>{title}</h1>
            <div className="card">
                {isHovered && <p>{messageHover || 'Please click on me now !'}</p>}
                <button onClick={() => setCount((count) => count + 1)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    count : {count}
                </button>
                {count >= 10 && <p>{message10Clicks || 'You are a master in the art of clicking !'}</p>}
            </div>
        </header>
    );
};

export default ClickCounter;