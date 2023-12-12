import { useMediaQuery } from "react-responsive";
import MenuItemMobile from "./MenuItemMobile";
import MenuItem from "./MenuItem";

// interface MenuItemProps {
//   food: {
//     id: string;
//     item: string;
//     price: number;
//     desc: string;
//     imgUrl: string;
//     protein: [];
//     tweaks?: string[];
//   };
// }
// interface dataProps {
//   data: MenuItemProps[];
// }

const MenuList = ({ data }: any) => {
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
