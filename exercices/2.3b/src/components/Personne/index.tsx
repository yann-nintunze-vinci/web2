
interface PersonneProps {
  name: string;
  age: number;
}

const Personne = ({ name, age }: PersonneProps) => {
  return (
    <div>
      <ul>
        <li>{name}</li>
        <li>{age}</li>
      </ul>
    </div>
  );
};

export default Personne;
