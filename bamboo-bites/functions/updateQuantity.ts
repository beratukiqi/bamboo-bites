interface OrderDetails {
	id: string;
	item: string;
	price: number;
	desc: string;
	imgUrl: string;
	quantity: number;
}

export enum QuantityChange {
	Increment,
	Decrement,
}

type SetCartFunction = (value: React.SetStateAction<OrderDetails[]>) => void;

interface FunctionParams {
	item: OrderDetails;
	setCart: SetCartFunction;
	change: QuantityChange;
}

export const updateQuantity = ({ item, setCart, change }: FunctionParams) => {
	setCart((currentCart) => {
		//A copy of the existing cart is created to avoid a direct change of the state.
		const updatedCart = [...currentCart];
		const existingItemIndex = updatedCart.findIndex(
			(cartItem) => cartItem.id === item.id
		);
		const existingItem = updatedCart[existingItemIndex];

		switch (change) {
			//If the quantity should increase the quantity increases with +1
			case QuantityChange.Increment:
				updatedCart[existingItemIndex] = {
					...existingItem,
					quantity: existingItem.quantity + 1,
				};
				break;

			//If the quantity should decrease the quantity decreases with -1
			case QuantityChange.Decrement:
				const newQuantity =
					existingItem.quantity > 1 ? existingItem.quantity - 1 : 0;
				updatedCart[existingItemIndex] = {
					...existingItem,
					quantity: newQuantity,
				};

				//If the quantity becomes zero the item is removed from the cart
				if (newQuantity === 0) {
					return updatedCart.filter((cartItem) => cartItem.id !== item.id);
				}
				break;
		}

		return updatedCart;
	});
};
