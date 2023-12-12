import React, { createContext, Dispatch, SetStateAction } from "react";
import { MenuItemProps, CartItemProps } from "@/interfaces";

interface OrderDetails {
  deliveryMethod: string;
  status: string;
}

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
