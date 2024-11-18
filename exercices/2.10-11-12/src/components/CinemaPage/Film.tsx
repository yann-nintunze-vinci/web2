import { useState } from "react";
import { NewFilm } from "../../types";

const FilmPage = ({title, director, minutes }: NewFilm) => {
    const [descPrinted, setDescPrinted] = useState(false);

    return (
        <div>
            <p onClick={() => setDescPrinted(!descPrinted)}>{title} - Realisateur : {director}</p>
            {descPrinted && <p style={{color: "grey", fontStyle: "italic"}}>{minutes} min</p>}
        </div>
    );
};

export default FilmPage;