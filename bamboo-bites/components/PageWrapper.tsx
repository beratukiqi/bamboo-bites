interface PageWrapperProps {
	children: React.ReactNode;
	column?: boolean;
	id?: string;
}

const PageWrapper = ({ children, column, id }: PageWrapperProps) => {
	return (
		<main id={id} className={`page-wrapper ${column ? "hero col-2" : ""}`}>
			{children}
		</main>
	);
};

export default PageWrapper;
