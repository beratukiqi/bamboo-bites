import React, { createContext, Dispatch, SetStateAction } from "react";
import { MenuItemProps, CartItemProps, OrderDetails } from "@/interfaces";

interface AppContextType {
  menuItems: MenuItemProps[];
  setMenuItems: Dispatch<SetStateAction<MenuItemProps[]>>;
  cart: CartItemProps[];
  setCart: Dispatch<SetStateAction<CartItemProps[]>>;
  orderDetails: OrderDetails;
  setOrderDetails: Dispatch<SetStateAction<OrderDetails>>;
}

const AppContext = createContext({} as AppContextType);

export default AppContext;
