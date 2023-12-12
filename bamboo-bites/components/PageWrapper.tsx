import { PageWrapperProps } from "@/interfaces";

const PageWrapper = ({ children, column, id }: PageWrapperProps) => {
	return (
		<main id={id} className={`page-wrapper ${column ? "hero col-2" : ""}`}>
			{children}
		</main>
	);
};

export default PageWrapper;
