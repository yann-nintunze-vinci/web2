interface FooterProps {
  children: React.ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  return <footer>{children}</footer>;
};

const FooterComp = () => (
  <Footer>
    <p>Site conçu par moi</p>
  </Footer>
);

export default FooterComp;
