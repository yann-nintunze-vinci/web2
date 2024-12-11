import { useOutletContext } from "react-router-dom";
import { MovieContext } from "../../types";
import AddMovieForm from "../AddMovieForm";
import PageTitle from "../PageTitle";

const AddMoviePage = () => {
  const { onMovieAdded, authenticatedUser }: MovieContext = useOutletContext();
  if (!authenticatedUser) {
    return <p>Veuillez vous connecter pour pouvoir ajouter un film !!</p>
  }
  return (
    <div>
      <PageTitle title="Add a movie" />
      <AddMovieForm onMovieAdded={onMovieAdded} />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default AddMoviePage;
