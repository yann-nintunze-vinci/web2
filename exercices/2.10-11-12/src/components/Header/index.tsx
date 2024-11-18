import "./Header.css";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <header>
    <h1>{title}</h1>
  </header>
);

const HeaderComp = () => {
  const title = "iMovies";
  return (
    <Header title={title}/>
  );
};

export default HeaderComp;
