import { useContext } from "react";
import AppContext from "@/context/AppContext";
import QtyButton from "./QtyButton";

interface OrderDetails {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
  quantity: number;
}

interface OrderItemProps {
  item: OrderDetails;
}

enum QuantityChange {
  Increment = 1,
  Decrement = -1,
}

const CartItem = ({ item }: OrderItemProps) => {
  const { cart, setCart } = useContext(AppContext);

  //Would be nice to extract this function
  //Function for updating the quantity. 
  const updateQuantity = (change: QuantityChange) => {
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
          const newQuantity = existingItem.quantity > 1 ? existingItem.quantity - 1 : 0;
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
  
  //Calls function to increment the quantity
  const incrementQuantity = () => {
    updateQuantity(QuantityChange.Increment);
  };
  //Calls function to decrement the quantity
  const decrementQuantity = () => {
    updateQuantity(QuantityChange.Decrement);
  };

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
          {item.price}
          <b>$</b>
        </span>
        <div className="order-item__quantity">
          <QtyButton title="-" action={decrementQuantity} />
          <span>{item.quantity}</span>
          <QtyButton title="+" action={incrementQuantity} />
        </div>
      </div>
    </article>
  );
};

export default CartItem;
