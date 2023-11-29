import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import AboutInfo from "@/components/helpers/AboutInfo";
import Footer from "@/components/Footer";

const About = () => {
	return (
		<PageWrapper id="about" column>
			<PageHeader
				title="About"
				img="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/about_desktop_720x1024.png"
			/>
			<PageColumn title="">
				<AboutInfo />
			</PageColumn>
		</PageWrapper>
	);
};

export default About;
