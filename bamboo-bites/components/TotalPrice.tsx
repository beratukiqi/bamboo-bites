import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppContext from "@/context/AppContext";

const TotalPrice = () => {
  const { cart } = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0); 

  const router = useRouter();
  const { deliveryMethod } = router.query;

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
