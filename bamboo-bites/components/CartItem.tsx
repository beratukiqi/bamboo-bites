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
  tweaks?: string[];
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
      <img src={item.imgUrl} alt="noodles bowl" className="order-item__image" />
      <div className="order-item__text">
        <h3 className="order-item__title">{item.item}</h3>
        <span className="order-item__price">
          <b>$</b>
          {item.price}
        </span>
        <div className="order-item__quantity">
          <QtyButton title="-" action={decrementQuantity} />
          <span>{item.quantity + " st"}</span>
          <QtyButton title="+" action={incrementQuantity} />
        </div>
      </div>
      {item.tweaks && item.tweaks.length > 0 && (
        <div className="order-item__tweaks">
          <h4 className="order-item__tweaks-title">Tweaks</h4>
          <ul className="order-item__tweaks-list">
            {item.tweaks.map((tweak, index) => (
              <li key={index} className="order-item__tweak">
                {tweak}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export default CartItem;
