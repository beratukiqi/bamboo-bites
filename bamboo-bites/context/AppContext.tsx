import React, { createContext, Dispatch, SetStateAction } from "react";
interface MenuItemProps {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
}

interface CartItemProps {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
  quantity: number;
}

interface AppContextType {
  menuItems: MenuItemProps[];
  setMenuItems: Dispatch<SetStateAction<MenuItemProps[]>>;
  cart: CartItemProps[];
  setCart: Dispatch<SetStateAction<CartItemProps[]>>;
}

const AppContext = createContext({} as AppContextType);

export default AppContext;