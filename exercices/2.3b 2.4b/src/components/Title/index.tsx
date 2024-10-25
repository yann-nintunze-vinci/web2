interface PageTitleProps {
  title: string;
}

const Title = ({ title }: PageTitleProps) => {
  return <h1>{title}</h1>;
};

export default Title;
