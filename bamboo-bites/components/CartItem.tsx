import { useContext } from "react";
import AppContext from "@/context/AppContext";
import QtyButton from "./QtyButton";
import { updateQuantity } from "@/functions/updateQuantity";
import { QuantityChange } from "@/functions/updateQuantity";
import { useRouter } from "next/router";

interface OrderDetails {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
  quantity: number;
  tweaks?: TweakProps;
}

interface TweakProps {
  allergens: { [key: string]: boolean };
  protein: string;
}

interface OrderItemProps {
  item: OrderDetails;
}

const CartItem = ({ item }: OrderItemProps) => {
  const route = useRouter();
  const path = route.pathname;
  const orderpage = path === "/order/[orderNr]";

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
        <div>
          <h2 className="order-item__title">{item.item}</h2>

          <ul className="order-item__tweaks">
            {/* Render protein tweak */}
            <li className="order-item__tweaks--protein">
              {item.tweaks?.protein ? item.tweaks.protein : "Standard"}
            </li>

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
        {!orderpage ? (
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
      </div>
    </article>
  );
};

export default CartItem;
