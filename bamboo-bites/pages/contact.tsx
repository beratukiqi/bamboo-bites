import PageWrapper from "@/components/PageWrapper";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import ContactInfo from "@/components/helpers/ContactInfo";

const Contact = () => {
	const imgURL = "https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/contact_desktop_720x1024.png"
	
	return (
		<PageWrapper id="contact" column>
			<PageColumn title="">
				<ContactInfo />
			</PageColumn>
			<PageHeader
				title="Contact"
				img={imgURL}
			/>
		</PageWrapper>
	);
};

export default Contact;
