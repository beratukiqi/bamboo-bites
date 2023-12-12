const PageColumn = ({
  children,
  title,
  className,
  id,
}: {
  children: any;
  title?: string;
  className?: string;
  id?: string;
}) => {
  return (
    <div
      id={id ? id : ""}
      className={`hero column ${className ? className : ""}`}
    >
      {title && <h2 className="column__title">{title}</h2>}
      {children}
    </div>
  );
};

export default PageColumn;
