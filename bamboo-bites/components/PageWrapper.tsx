const PageWrapper = ({
  children,
  column,
}: {
  children: any;
  column?: boolean;
}) => {
  return (
    <div className={`page-wrapper ${column && "hero col-2"}`}>{children}</div>
  );
};

export default PageWrapper;
