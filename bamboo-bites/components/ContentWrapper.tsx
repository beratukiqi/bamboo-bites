const ContentWrapper = ({
  children,
  title,
}: {
  children: any;
  title: string;
}) => {
  return (
    <section className="content">
      <h3 className="content__title">{title}</h3>
      <div className={`content__container`}>{children}</div>
    </section>
  );
};

export default ContentWrapper;
