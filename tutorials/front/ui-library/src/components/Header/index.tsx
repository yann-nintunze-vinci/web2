import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
  version: number;
  handleHeaderClick: () => void;
}

const Header = ({ title, handleHeaderClick }: HeaderProps) => {
  const [menuPrinted, setMenuPrinted] = useState(false);

  const handleClick = () => {
    console.log(`value of menuPrinted before click: ${menuPrinted}`);
    setMenuPrinted(!menuPrinted);
    handleHeaderClick();
  };
  return (
    <Box component="header" onClick={handleClick}>
      <Container maxWidth="sm">
        <Typography variant="h1">
          {menuPrinted ? `${title}... and rarely do we have it` : title}
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;
