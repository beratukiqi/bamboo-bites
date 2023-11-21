import { useState } from "react";
import { useRouter } from "next/router";

const DeliveryMethod = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const router = useRouter();

  const handleDeliveryMethod = (e: any) => {
    //Sets the delivery method based on checked in button
    setDeliveryMethod(e.target.value);
    //Then sets the url based on delivery method
    router.push(`/checkout?deliveryMethod=${e.target.value}`);
  };

  return (
    <article className="delivery-method">
      <div>
        <input
          type="radio"
          id="pickup"
          name="deliveryMethod"
          value="pickup"
          aria-labelledby="labelPickup"
          onChange={handleDeliveryMethod}
          checked={deliveryMethod === "pickup"}
        />
        <label id="labelPickup" htmlFor="pickup">
          Pick-up
        </label>
        <span>Free of charge</span>
      </div>
      <div>
        <input
          type="radio"
          id="delivery"
          name="deliveryMethod"
          value="delivery"
          aria-labelledby="labelDelivery"
          onChange={handleDeliveryMethod}
          checked={deliveryMethod === "delivery"}
        />
        <label id="labelDelivery" htmlFor="delivery">
          Home delivery
        </label>
        <span>$10</span>
      </div>
    </article>
  );
};

export default DeliveryMethod;
