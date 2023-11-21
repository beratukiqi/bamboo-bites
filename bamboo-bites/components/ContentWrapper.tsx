const ContentWrapper = ({
  children,
  title,
  small,
}: {
  children?: any;
  title: string;
  small?: boolean;
}) => {
  return (
    <section className={`content ${small && "small"}`}>
      <h3 className="content__title">{title}</h3>
      <div className={`content__container`}>{children}</div>
    </section>
  );
};

export default ContentWrapper;
