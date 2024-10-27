import { useState } from "react";
import "./ClickColors.css";

const ClickColors = () => {
  const colors = ["red", "green", "blue", "yellow", "purple"];
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="color-box" style={{ backgroundColor: colors[index] }}>
        <button onClick={() => setIndex((index) => (index + 1) % 5)}>
          {colors[(index + 1) % 5]}
        </button>
      </div>
      <p>{colors[index]}</p>
    </>
  );
};

export default ClickColors;
