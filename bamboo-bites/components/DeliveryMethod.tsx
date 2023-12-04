import { useState } from "react";
import { useContext } from "react";
import AppContext from "@/context/AppContext";

const DeliveryMethod = () => {
  // const [deliveryMethod, setDeliveryMethod] = useState("eatIn");
  const { orderDetails, setOrderDetails } = useContext(AppContext);

// Change the delivery method to "takeAway"
  const handleDeliveryMethod = (e: any) => {
    setOrderDetails({
      ...orderDetails,
      deliveryMethod: e.target.value
    });
  };

  return (
    <article className="delivery-method">
      <div>
        <input
          type="radio"
          id="eatIn"
          name="deliveryMethod"
          value="eatIn"
          aria-labelledby="labelEatIn"
          onChange={handleDeliveryMethod}
          checked={orderDetails.deliveryMethod === "eatIn"}
        />
        <label id="labelEatIn" htmlFor="eatIn">
          Eat In
        </label>
      </div>
      
      <div>
        <input
          type="radio"
          id="takeAway"
          name="deliveryMethod"
          value="takeAway"
          aria-labelledby="labelTakeAway"
          onChange={handleDeliveryMethod}
          checked={orderDetails.deliveryMethod === "takeAway"}
        />
        <label id="labelTakeAway" htmlFor="takeAway">
          Take Away
        </label>
      </div>
    </article>
  );
};

export default DeliveryMethod;
