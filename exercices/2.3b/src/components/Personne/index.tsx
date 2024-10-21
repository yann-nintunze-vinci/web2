import "./Personne.css";

interface PersonneProps {
  name: string;
  age: number;
  isOnline: boolean;
}

const Personne = ({ name, age, isOnline }: PersonneProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{age}</p>
      <p className={isOnline ? "online" : "offline"}>
        {isOnline ? "En ligne" : "Hors ligne"}
      </p>
    </div>
  );
};

export default Personne;
