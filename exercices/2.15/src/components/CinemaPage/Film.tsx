import { useState } from "react";
import { NewFilm } from "../../types";

const FilmPage = ({ title, director, duration }: NewFilm) => {
  const [descPrinted, setDescPrinted] = useState(false);

  return (
    <li onClick={() => setDescPrinted(!descPrinted)} className="listFilmPage">
      {title} - Realisateur : {director}
      {descPrinted && (
        <span style={{ color: "grey", fontStyle: "italic" }}>
          <br />
          {duration} minutes
        </span>
      )}
    </li>
  );
};

export default FilmPage;
