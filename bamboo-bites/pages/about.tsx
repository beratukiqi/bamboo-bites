import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import AboutInfo from "@/components/helpers/AboutInfo";

const About = () => {
  return (
    <PageWrapper column>
      <PageHeader
        title="About us"
        img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
      />
      <PageColumn title="Our vision">
        <AboutInfo />
      </PageColumn>
    </PageWrapper>
  );
};

export default About;
