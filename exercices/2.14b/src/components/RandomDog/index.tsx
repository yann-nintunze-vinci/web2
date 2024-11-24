import Dog from "../../type";
import "./RandomDog.css";

interface RandomDogProps {
  dog: Dog;
  ActionOnMouseEnter: () => void;
  ActionOnMouseLeave: () => void;
}

const RandomDog = ({ dog, ActionOnMouseEnter, ActionOnMouseLeave }: RandomDogProps) => {
  return <img onMouseEnter={ActionOnMouseEnter} onMouseLeave={ActionOnMouseLeave} src={dog.message} alt="Dog" />;
};

export default RandomDog;
