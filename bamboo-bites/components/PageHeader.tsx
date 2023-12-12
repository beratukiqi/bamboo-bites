import { PageHeaderProps } from "@/interfaces";

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
