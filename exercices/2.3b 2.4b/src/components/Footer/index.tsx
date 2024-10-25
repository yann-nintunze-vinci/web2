interface FooterTextProps {
    text: string;
}

const Footer = ({ text }: FooterTextProps) => {
    return <footer>{text}</footer>;
};

export default Footer;