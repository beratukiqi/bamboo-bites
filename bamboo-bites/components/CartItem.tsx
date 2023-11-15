import { useContext } from "react";
import AppContext from "@/context/AppContext";
import QtyButton from "./QtyButton";
import { updateQuantity } from "@/functions/updateQuantity";
import { QuantityChange } from "@/functions/updateQuantity";

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

const CartItem = ({ item }: OrderItemProps) => {
  const { setCart } = useContext(AppContext);

  const incrementQuantity = () => {
    updateQuantity({ item, setCart, change: QuantityChange.Increment });
  };

  const decrementQuantity = () => {
    updateQuantity({ item, setCart, change: QuantityChange.Decrement });
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
