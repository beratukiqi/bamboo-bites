import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DeliveryMethod = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const router = useRouter();

  const handleDeliveryMethod = (e: any) => {
    setDeliveryMethod(e.target.value);
    router.push(`/checkout?deliveryMethod=${e.target.value}`);
  };

  return (
    <article className="delivery-method">
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
        <span>10 $</span>
      </div>
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
          Pick up
        </label>
        <span>Free of charge</span>
      </div>
    </article>
  );
};

export default DeliveryMethod;
