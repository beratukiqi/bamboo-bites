import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";

const Contact = () => {
  return (
    <main>
      <PageWrapper column>
        <PageHeader
          title="Contact"
          img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
        />
        <PageColumn title="Get in touch">
          <h3>Address</h3>
          <p>123 Bamboo Street</p>
          <p>123 45, Bamboo City</p>
          <p>Bamboo Country</p>
          <h3>Phone</h3>
          <p>+123 456 78 90</p>
          <h3>Email</h3>
        </PageColumn>
      </PageWrapper>
    </main>
  );
};

export default Contact;
