import MenuItem from "@/components/MenuItem";
import Modal from "@/components/Modal";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import AppContext from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";

const Menu = () => {
  const { menuItems, setMenuItems, cart, setCart } = useContext(AppContext);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/menu"
        );
        const data = await response.json();
        setMenuItems(data.menu);
      } catch (error) {
        console.error(error, "Something went wrong");
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    console.log("Menu Items Context", menuItems);
  }, [menuItems]);

  return (
    <main>
      <PageWrapper column>
        <PageHeader
          title="Menu"
          img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
        />
        <PageColumn title="Main courses">
          {menuItems &&
            menuItems.map((food, index) => (
              <MenuItem food={food} key={index} />
            ))}
        </PageColumn>
      </PageWrapper>
    </main>
  );
};

export default Menu;
