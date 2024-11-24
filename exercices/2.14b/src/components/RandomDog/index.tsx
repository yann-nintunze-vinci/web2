import Dog from "../../type";
import "./RandomDog.css";

interface RandomDogProps {
  dog: Dog;
  fetchDog: () => void;
}

const RandomDog = ({ dog, fetchDog }: RandomDogProps) => {
  return (
    <div>
      <img onClick={fetchDog} src={dog.message} alt="Dog" />
    </div>
  );
};

export default RandomDog;
