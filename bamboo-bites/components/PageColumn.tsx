const PageColumn = ({ children, title }: { children: any; title: string }) => {
	return (
		<div className="hero__column">
			{title && <h2 className="page-column-title">{title}</h2>}
			{children}
		</div>
	);
};

export default PageColumn;
