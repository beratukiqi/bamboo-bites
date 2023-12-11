import { useContext, useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import MenuList from "@/components/MenuList";
import AppContext from "@/context/AppContext";

const Menu = () => {
  const { menuItems, setMenuItems } = useContext(AppContext);
  const imgURL =
    "https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/menu_desktop_720x1024.png";

  useEffect(() => {
    async function fetchMenu() {
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
    fetchMenu();
  }, []);

  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);

  return (
    <PageWrapper column>
      <PageHeader title="Menu" img={imgURL} />
      <PageColumn title="Savor, Explore, Enjoy!">
        <MenuList data={menuItems} />
      </PageColumn>
    </PageWrapper>
  );
};

export default Menu;
