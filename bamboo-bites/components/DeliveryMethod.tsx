const DeliveryMethod = () => {
  return (
    <article className="delivery-method">
      <div>
        <input
          type="radio"
          id="delivery"
          name="deliveryMethod"
          value="delivery"
          aria-labelledby="labelDelivery"
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
