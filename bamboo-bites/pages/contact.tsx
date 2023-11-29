import ContactForm from "@/components/ContactForm";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import ContactInfo from "@/components/helpers/ContactInfo";
import Footer from "@/components/Footer";

const Contact = () => {
	return (
		<PageWrapper id="contact" column>
			<PageColumn title="">
				<ContactInfo />
			</PageColumn>
			<PageHeader
				title="Contact"
				img="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/contact_desktop_720x1024.png"
			/>
		</PageWrapper>
	);
};

export default Contact;
