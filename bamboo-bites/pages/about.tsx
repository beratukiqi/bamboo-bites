import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import AboutInfo from "@/components/helpers/AboutInfo";

const About = () => {
	const imgURL = "https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/about_desktop_720x1024.png"
	
	return (
		<PageWrapper id="about" column>
			<PageHeader
				title="About"
				img={imgURL}
			/>
			<PageColumn title="">
				<AboutInfo />
			</PageColumn>
		</PageWrapper>
	);
};

export default About;
