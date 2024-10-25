import { useState } from 'react'

interface HeaderProps {
    title: string;
    message: string;
}

const Header = ({ title, message }: HeaderProps) => {
    const [count, setCount] = useState(0)

    return (
        <header>
            <h1>{title}</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    Cliquez !
                </button>
                {count >= 10 ? <p>{message}</p> : null}
            </div>
        </header>
    );
};

export default Header;