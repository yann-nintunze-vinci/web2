import { useNavigate } from "react-router-dom";
import { MaybeAuthenticatedUser } from "../../types";
import "./Navbar.css";

interface NavBarProps {
  authenticatedUser: MaybeAuthenticatedUser;
  clearUser: () => void;
}

const NavBar = ({ authenticatedUser, clearUser }: NavBarProps) => {
  const navigate = useNavigate();
  if (authenticatedUser) {
    return (
      <nav>
        <button onClick={() => navigate("/")}>Home</button>
        {authenticatedUser.username === "admin" && (
          <button onClick={() => navigate("/add-pizza")}>
            Ajouter une pizza
          </button>
        )}
        <button onClick={() => clearUser()}>Se déconnecter</button>
      </nav>
    );
  }

  return (
    <nav>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/register")}>
        Créer un utilisateur
      </button>
      <button onClick={() => navigate("/login")}>Se connecter</button>
    </nav>
  );
};

export default NavBar;
