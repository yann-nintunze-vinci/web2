import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./components/App/index.jsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>
);
