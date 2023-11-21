import ContentWrapper from "@/components/ContentWrapper";
import MenuList from "@/components/MenuList";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import AppContext from "@/context/AppContext";
import { useContext, useEffect } from "react";

const Menu = () => {
  const { menuItems, setMenuItems } = useContext(AppContext);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/menu"
        );
        const data = await response.json();
        setMenuItems(data.menu);
      } catch (error) {
        console.error(error, "Failed to fetch menu items");
      }
    }
    fetchEvents();
  }, []);

  return (
    <PageWrapper column>
      <PageHeader
        title="Menu"
        img="https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/menu_desktop_720x1024.png"
      />
      <PageColumn title="Savor, Explore, Enjoy!">
        <ContentWrapper title="">
          <MenuList data={menuItems} />
        </ContentWrapper>
      </PageColumn>
    </PageWrapper>
  );
};

export default Menu;
