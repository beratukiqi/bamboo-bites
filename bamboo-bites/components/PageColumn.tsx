const PageColumn = ({ children, title }: { children: any; title: string }) => {
  return (
    <div className="hero__column">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default PageColumn;
