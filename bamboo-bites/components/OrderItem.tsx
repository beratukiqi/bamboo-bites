import AppContext from "@/context/AppContext";
import { useContext } from "react";

interface OrderItemProps {
  item: {
    id: string;
    item: string;
    price: number;
    imgUrl: string;
    desc: string;
    quantity: number;
  };
}

const OrderItem = ({ item }: OrderItemProps) => {
  const { cart, setCart } = useContext(AppContext);

  const incrementQuantity = () => {
    setCart((currentCart) => {
      const updatedCart = [...currentCart];
      const existingItemIndex = updatedCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      const existingItem = updatedCart[existingItemIndex];
      updatedCart[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      return updatedCart;
    });
  };

  const decrementQuantity = () => {
    setCart((currentCart) => {
      const updatedCart = [...currentCart];
      const existingItemIndex = updatedCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      const existingItem = updatedCart[existingItemIndex];

      if (existingItem.quantity <= 1) {
        // Remove the item from the cart
        return currentCart.filter((cartItem) => cartItem.id !== item.id);
      } else {
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity > 1 ? existingItem.quantity - 1 : 1,
        };
        return updatedCart;
      }
    });
  };

  const totalPrice = item.price * item.quantity;

  return (
    <article className="order-item">
      <img
        src="https://i.ibb.co/GMzvf0P/noodles-bowl-720x1024-72px-1.png"
        alt="noodles bowl"
        className="order-item__image"
      />
      <div className="order-item__text">
        <h3 className="order-item__title">{item.item}</h3>
        <span className="order-item__price">
          {totalPrice}
          <b>$</b>
        </span>
        <div className="order-item__quantity">
          <button onClick={decrementQuantity}>-</button>
          <span>{item.quantity}</span>
          <button onClick={incrementQuantity}>+</button>
        </div>
      </div>
    </article>
  );
};

export default OrderItem;
