interface HomePageProps {
  children: React.ReactNode;
}

const HomePage = ({children}: HomePageProps) => (
  <div>
    {children}
  </div>
);

const HomePageComp = () => (
  <HomePage>
    <p>Site sur la culture cinématograpique.</p>
  </HomePage>
)

export default HomePageComp;
