import "./App.css";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../Main";
import { useState } from "react";
import { Box } from "@mui/material";

function App() {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);

  const handleHeaderClick = () => {
    setActionToBePerformed(true);
  };

  const clearActionToBePerformed = () => {
    setActionToBePerformed(false);
  };

  return (
    <Box>
      <Header title="We love Pizza" version={0 + 1} handleHeaderClick={handleHeaderClick}/>
      <Main actionToBePerformed={actionToBePerformed}
        clearActionToBePerformed={clearActionToBePerformed}/>
      <Footer />
    </Box>
  );
}

export default App;
