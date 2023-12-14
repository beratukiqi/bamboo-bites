import { useContext, useEffect, useState } from "react";
import AppContext from "@/context/AppContext";

const TotalPrice = () => {
  const { cart, orderDetails } = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const deliveryMethod = orderDetails.deliveryMethod;

  const calcTotalPrice = () => {
    let price = 0;
    cart.forEach((item) => {
      price += item.price * item.quantity;
    });

    if (deliveryMethod === "delivery") {
      price += 10;
    }

    return price;
  };

  // Updates the total price when cart or delivery method is updated
  useEffect(() => {
    setTotalPrice(calcTotalPrice());
  }, [cart, deliveryMethod]);

  return (
    <div className="total-price">
      <h3 className="total-price__title">Total</h3>
      <span className="total-price__price">${totalPrice}</span>
    </div>
  );
};

export default TotalPrice;
