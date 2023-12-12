import { useContext } from "react";
import { updateQuantity } from "@/functions/updateQuantity";
import { QuantityChange } from "@/functions/updateQuantity";
import AppContext from "@/context/AppContext";
import QtyButton from "./QtyButton";
import Image from "next/image";
import { OrderItemProps } from "@/interfaces";

const CartItem = ({ item, editable }: OrderItemProps) => {
  const { setCart } = useContext(AppContext);

  const incrementQuantity = () => {
    updateQuantity({ item, setCart, change: QuantityChange.Increment });
  };

  const decrementQuantity = () => {
    updateQuantity({ item, setCart, change: QuantityChange.Decrement });
  };

  return (
    <article className="order-item">
      <Image
        width={200}
        height={200}
        src={item.imgUrl}
        alt="noodles bowl"
        className="order-item__image"
      />
      <div className="order-item__header">
        <h2 className="order-item__title">{item.item}</h2>

        <ul className="order-item__tweaks">
          {/* Render protein tweak */}
          {item.tweaks?.protein ? (
            <li className="order-item__tweaks--protein">
              {item.tweaks?.protein}
            </li>
          ) : (
            <li className="order-item__tweaks--standard">Standard</li>
          )}

          {/* Render allergens tweaks */}
          {item.tweaks?.allergens &&
            Object.entries(item.tweaks.allergens).map(([key, value]) => (
              <li
                key={key}
                className={`order-item__tweaks--allergen ${
                  value ? "--active" : ""
                }`}
              >
                {key}
              </li>
            ))}
        </ul>
      </div>
      {editable ? (
        <div className="order-item__quantity">
          <QtyButton title="-" action={decrementQuantity} />
          <span>{item.quantity}</span>
          <QtyButton title="+" action={incrementQuantity} />
        </div>
      ) : (
        <div className="order-item__quantity --orderpage">
          <span>QTY: {item.quantity}</span>
        </div>
      )}
      <div className="order-item__details">
        <span className="order-item__price">
          <b>$</b>
          {item.price}
        </span>
      </div>
    </article>
  );
};

export default CartItem;
