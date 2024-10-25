import './Header.css';

interface HeaderProps {
  title: string;
  children: React.ReactNode;
}

const PageTitle = ({ title, children }: HeaderProps) => {
  return (
    <header>
      <h1>{title}</h1>
      {children}
    </header>
  );
};

export default PageTitle;
