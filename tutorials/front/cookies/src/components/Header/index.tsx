import { useState } from "react";
import "./Header.css";
import { MaybeAuthenticatedUser } from "../../types";

interface HeaderProps {
  title: string;
  authenticatedUser: MaybeAuthenticatedUser;
  handleHeaderClick: () => void;
}

const Header = ({
  title,
  authenticatedUser,
  handleHeaderClick,
}: HeaderProps) => {
  const [menuPrinted, setMenuPrinted] = useState(false);

  const handleClick = () => {
    console.log(`value of menuPrinted before click: ${menuPrinted}`);
    setMenuPrinted(!menuPrinted);
    handleHeaderClick();
  };

  return (
    <header>
      <h1 className="animate__animated animate__bounce" onClick={handleClick}>
        {menuPrinted ? `${title}... and rarely do we hate it!` : title}
      </h1>
      <h2>{authenticatedUser && `Hey ${authenticatedUser?.username}`}</h2>
    </header>
  );
};

export default Header;
