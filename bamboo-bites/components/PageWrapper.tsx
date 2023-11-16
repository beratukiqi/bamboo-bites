const PageWrapper = ({
  children,
  column,
}: {
  children: any;
  column?: boolean;
}) => {
  return (
    <main className={`page-wrapper ${column && "hero col-2"}`}>{children}</main>
  );
};

export default PageWrapper;
