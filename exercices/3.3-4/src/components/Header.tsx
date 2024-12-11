import "./Header.css";

interface HeaderProps {
  urlLogo: string;
  children: React.ReactNode;
  theme: string;
}
const Header = ({ urlLogo, children, theme }: HeaderProps) => {
  return (
    <header className={`header ${theme}`}>
      <img src={urlLogo} alt="logo" className="logo" />
      <div>{children}</div>
    </header>
  );
};

export default Header;
