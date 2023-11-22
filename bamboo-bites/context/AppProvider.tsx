import { useState } from "react";
import AppContext from "./AppContext";

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
  tweaks?: string[];
}

interface OrderDetails {
  deliveryMethod: string;
}

const AppProvider = ({ children }: any) => {
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
  const [cart, setCart] = useState<CartItemProps[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({deliveryMethod: "pickup"});

  return (
    <AppContext.Provider value={{ menuItems, setMenuItems, cart, setCart, orderDetails, setOrderDetails}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
