import MenuItem from "./MenuItem";

interface MenuItemProps {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
}

const MenuList = ({ data }: { data: MenuItemProps[] }) => {
  return (
    data &&
    data.map((food: MenuItemProps, index: number) => (
      <MenuItem food={food} key={index} />
    ))
  );
};

export default MenuList;
