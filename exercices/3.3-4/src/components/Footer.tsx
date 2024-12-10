import "./Footer.css";

interface FooterProps {
  urlLogo: string;
  children: React.ReactNode;
  theme: string;
}

const Footer = ({urlLogo, children, theme}: FooterProps) => {
  return (
    <footer className={`footer ${theme}`}>
      <div>{children}</div>
      <img src={urlLogo} alt="logo" className="logo" />
    </footer>
  );
};

export default Footer;
