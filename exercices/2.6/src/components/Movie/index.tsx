import { useState } from "react";

interface MovieProps {
    title: string;
    director: string;
    description: string;
}

const Movie = ({ title, director, description }: MovieProps) => {
    const [descPrinted, setDescPrinted] = useState(false);

    return (
        <>
            <p onClick={() => setDescPrinted(!descPrinted)}>{title} - Realisateur : {director}</p>
            {descPrinted && <p style={{color: "grey", fontStyle: "italic"}}>{description}</p>}
        </>

    );
};

export default Movie;