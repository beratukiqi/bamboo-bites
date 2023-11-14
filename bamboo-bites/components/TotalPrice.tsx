import { useContext } from "react";
import AppContext from "@/context/AppContext";

const TotalPrice = () => {
    const { cart } = useContext(AppContext);

    const calcTotalPrice = () => {
        let totalPrice = 0;
        cart.map((item) => {
            let itemPrice = item.price * item.quantity
            totalPrice += itemPrice
        })
        return totalPrice
    }

    return (
      <div className="total-price">
        <h3 className="total-price__title">Total</h3>
        <span className="total-price__price">
            {calcTotalPrice()}
            <b>$</b>
        </span>
      </div>
    );
  };
  
  export default TotalPrice;