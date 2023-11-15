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
        img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
      />
      <PageColumn title="Main courses">
        <MenuList data={menuItems} />
      </PageColumn>
    </PageWrapper>
  );
};

export default Menu;
