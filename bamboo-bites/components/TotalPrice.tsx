import { useContext, useEffect, useState } from "react";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/router";

const TotalPrice = () => {
  const { cart } = useContext(AppContext);
  const router = useRouter();
  const { deliveryMethod } = router.query;
  const [totalPrice, setTotalPrice] = useState(0); // [1

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

  useEffect(() => {
    setTotalPrice(calcTotalPrice());
  }, [cart, deliveryMethod]);

  return (
    <div className="total-price">
      <h3 className="total-price__title">Total</h3>
      <span className="total-price__price">
        {totalPrice}
        <b>$</b>
      </span>
    </div>
  );
};

export default TotalPrice;
