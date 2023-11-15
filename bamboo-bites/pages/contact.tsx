import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import ContactInfo from "@/components/helpers/ContactInfo";

const Contact = () => {
  return (
    <PageWrapper column>
      <PageHeader
        title="Contact"
        img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
      />
      <PageColumn title="Get in touch">
        <ContactInfo />
      </PageColumn>
    </PageWrapper>
  );
};

export default Contact;
