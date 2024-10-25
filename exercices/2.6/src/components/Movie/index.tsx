import { useState } from "react";

interface MovieProps {
    title: string;
    director: string;
    description: string;
}

const Movie = ({ title, director, description }: MovieProps) => {
    const [descPrinted, setDescPrinted] = useState(false);
    
    const descriptionStyle = {
        color: 'grey',
        fontStyle: 'italic'
    };

    return (
        <>
            <p onClick={() => setDescPrinted(!descPrinted)}>{title} - Realisateur : {director}</p>
            {descPrinted && <p style={descriptionStyle}>{description}</p>}
        </>

    );
};

export default Movie;