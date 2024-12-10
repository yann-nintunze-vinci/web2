import "./Header.css";

interface HeaderProps {
  urlLogo: string;
  children: React.ReactNode;
  theme: string;
  setTheme: (theme:string) => void;
}
const Header = ({urlLogo, children, theme, setTheme}: HeaderProps) => {
  return (
    <header className={`header ${theme}`}>
      <img src={urlLogo} alt="logo" className="logo" />
      <div>{children}</div>
      <button
        onClick={() =>
          setTheme(theme === "light" ? "dark" : "light")
        }
      >
        switch theme {theme}
      </button>
    </header>
  );
};

export default Header;
