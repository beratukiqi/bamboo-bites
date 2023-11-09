import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";

const Contact = () => {
  return (
    <main>
      <PageWrapper column>
        <PageHeader
          title="About us"
          img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
        />
        <PageColumn title="Our vision">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, voluptatem, quia, quibusdam quos voluptatum dicta
            doloribus quod consequatur voluptate doloremque. Quisquam
            voluptates, voluptatem, quia, quibusdam quos voluptatum dicta
            doloribus quod consequatur voluptate doloremque.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, voluptatem, quia, quibusdam quos voluptatum dicta
            doloribus quod consequatur voluptate doloremque. Quisquam
            voluptates, voluptatem, quia, quibusdam quos voluptatum dicta
            doloribus quod consequatur voluptate doloremque.
          </p>
        </PageColumn>
      </PageWrapper>
    </main>
  );
};

export default Contact;
