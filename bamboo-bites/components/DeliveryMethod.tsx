// import { useState } from "react";
// import { useRouter } from "next/router";
import { useContext } from "react";
import AppContext from "@/context/AppContext";

const DeliveryMethod = () => {
  // const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const { orderDetails, setOrderDetails } = useContext(AppContext);

// Change the delivery method to "delivery"
  const handleDeliveryMethod = (e: any) => {
    setOrderDetails({
      ...orderDetails,
      deliveryMethod: e.target.value
    });
  };
  
  // const router = useRouter();

  // const handleDeliveryMethod = (e: any) => {
  //   //Sets the delivery method based on checked in button
  //   setDeliveryMethod(e.target.value);
  //   //Then sets the url based on delivery method
  //   router.push(`/checkout?deliveryMethod=${e.target.value}`);
  // };

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
        {/* <span>Free of charge</span> */}
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
        {/* <span>$10</span> */}
      </div>
    </article>
  );
};

export default DeliveryMethod;
