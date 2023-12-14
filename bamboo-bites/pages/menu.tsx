import { useContext, useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import MenuList from "@/components/MenuList";
import AppContext from "@/context/AppContext";

const Menu = () => {
  const { menuItems, setMenuItems } = useContext(AppContext);

  const API_URL =
    "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/menu";
  const imgURL =
    "https://bamboo-bites-bucket.s3.eu-north-1.amazonaws.com/desktop/menu_desktop_720x1024.png";

  // Fetches menu data on mount and sets it to state
  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMenuItems(data.menu);
      } catch (error) {
        console.error(error, "Failed to fetch menu items");
      }
    }
    fetchMenu();
  }, []);

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
