import { useMediaQuery } from "react-responsive";
import MenuItemMobile from "./MenuItemMobile";
import MenuItem from "./MenuItem";
import { MenuItemProps } from "@/interfaces";

interface DataProps {
  data: MenuItemProps[];
}

const MenuList = ({ data }: DataProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    data &&
    data.map((food: any, index: number) => (
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
