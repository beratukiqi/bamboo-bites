import MenuItem from "@/components/MenuItem";
import Modal from "@/components/Modal";
import PageColumn from "@/components/PageColumn";
import PageHeader from "@/components/PageHeader";
import PageWrapper from "@/components/PageWrapper";
import { useEffect, useState } from "react";

interface MenuItem {
  id: string;
  item: string;
  price: number;
  desc: string;
}

const Menu = () => {
  const [data, setData] = useState<MenuItem[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/menu"
        );
        const data = await response.json();
        setData(data.menu);
      } catch (error) {
        console.error(error, "Something went wrong");
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <main>
      <PageWrapper column>
        <PageHeader
          title="Menu"
          img="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
        />
        <PageColumn title="Main courses">
          {data &&
            data.map((food, index) => (
              <MenuItem
                food={food}
                key={index}
                item={food.item}
                price={food.price}
                desc={food.desc}
              />
            ))}
        </PageColumn>
      </PageWrapper>
    </main>
  );
};

export default Menu;
