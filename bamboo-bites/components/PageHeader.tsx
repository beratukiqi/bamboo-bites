interface PageHeaderProps {
  title: string;
  img: string;
  landingpage?: boolean;
  children?: any;
}

const PageHeader = ({ title, img, landingpage, children }: PageHeaderProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
      }}
      className={`hero__column ${landingpage ? "landingpage" : "sticky"}`}
    >
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default PageHeader;
