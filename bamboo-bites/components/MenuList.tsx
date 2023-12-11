import { useMediaQuery } from "react-responsive";
import MenuItemMobile from "./MenuItemMobile";
import MenuItem from "./MenuItem";

interface MenuItemProps {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
  protein: [];
}

const MenuList = ({ data }: { data: MenuItemProps[] }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    data &&
    data.map((food: MenuItemProps, index: number) => (
      <>
        {isMobile ? (
          <MenuItemMobile food={food} key={food.item + index} />
        ) : (
          <MenuItem food={food} key={index} />
        )}
      </>
    ))
  );
};

export default MenuList;
