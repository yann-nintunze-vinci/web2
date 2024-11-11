import { useState } from "react";
import { Film } from "../../types";

const FilmPage = ({ title, director, description }: Film) => {
    const [descPrinted, setDescPrinted] = useState(false);

    return (
        <div>
            <p onClick={() => setDescPrinted(!descPrinted)}>{title} - Realisateur : {director}</p>
            {descPrinted && <p style={{color: "grey", fontStyle: "italic"}}>{description}</p>}
        </div>
    );
};

export default FilmPage;