import { useState } from "react";
import AppContext from "./AppContext";
import { MenuItemProps, CartItemProps } from "@/interfaces";

interface OrderDetails {
	deliveryMethod: string;
	status: string;
}

const AppProvider = ({ children }: any) => {
	const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
	const [cart, setCart] = useState<CartItemProps[]>([]);
	const [orderDetails, setOrderDetails] = useState<OrderDetails>({
		deliveryMethod: "takeAway",
		status: "pending",
	});

	return (
		<AppContext.Provider
			value={{
				menuItems,
				setMenuItems,
				cart,
				setCart,
				orderDetails,
				setOrderDetails,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
