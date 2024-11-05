import { Box, Container, Typography } from "@mui/material";
import { Copyright } from "@mui/icons-material";
import logo from "../../assets/images/js-logo.png";
import './Footer.css';

const Footer = () => {
  return (
    <Box component="footer" color="">
      <Container maxWidth="sm">
        <Box>
          <Typography variant="body2">But we also love JS</Typography>
          <Typography>
            <Copyright />
            myAmazingPizzeria
          </Typography>
        </Box>
        <Box>
          <img src={logo} alt="" width={50} />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
