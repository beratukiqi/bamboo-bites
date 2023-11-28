const PageColumn = ({
  children,
  title,
  className,
}: {
  children: any;
  title?: string;
  className?: string;
}) => {
  return (
    <div className={`hero column ${className ? className : ""}`}>
      {title && <h2 className="page-column-title">{title}</h2>}
      {children}
    </div>
  );
};

export default PageColumn;
