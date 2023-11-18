import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import ContactInfo from "@/components/helpers/ContactInfo";

const Contact = () => {
  return (
    <PageWrapper column>
      <PageHeader
        title="Contact"
        img="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/contact_desktop_720x1024.png"
      />
      <PageColumn title="">
        <ContactInfo />
      </PageColumn>
    </PageWrapper>
  );
};

export default Contact;
