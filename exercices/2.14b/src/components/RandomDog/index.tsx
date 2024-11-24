import Dog from "../../type";
import "./RandomDog.css";

interface RandomDogProps {
  dog: Dog;
}

const RandomDog = ({ dog }: RandomDogProps) => {
  return <img src={dog.message} alt="Dog" />;
};

export default RandomDog;
