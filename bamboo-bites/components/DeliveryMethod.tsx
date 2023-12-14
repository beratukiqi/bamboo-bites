import { useState, useEffect } from "react";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import { motion } from "framer-motion";

const DeliveryMethod = () => {
  const [currentDeliveryMethod, setCurrentDeliveryMethod] =
    useState("takeAway");
  const { orderDetails, setOrderDetails } = useContext(AppContext);

  useEffect(() => {
    setOrderDetails({
      ...orderDetails,
      deliveryMethod: "takeAway",
    });
  }, []);

  // Change the delivery method to "takeAway"
  const handleDeliveryMethod = (e: any) => {
    setCurrentDeliveryMethod(e.target.value);
    setOrderDetails({
      ...orderDetails,
      deliveryMethod: e.target.value,
    });
  };

  return (
    <article className="delivery-method">
      <motion.div
        whileHover={{
          backgroundColor: "rgb(53, 53, 53)",
          cursor: "pointer",
          transition: { duration: 0.1 },
        }}
        className="delivery-method__choice"
      >
        <input
          type="radio"
          id="takeAway"
          name="deliveryMethod"
          value="takeAway"
          aria-labelledby="labelTakeAway"
          onChange={handleDeliveryMethod}
          checked={currentDeliveryMethod === "takeAway"}
        />
        <label id="labelTakeAway" htmlFor="takeAway">
          Take Away
        </label>
      </motion.div>

      <motion.div
        whileHover={{
          backgroundColor: "rgb(53, 53, 53)",
          cursor: "pointer",
          transition: { duration: 0.1 },
        }}
        className="delivery-method__choice"
      >
        <input
          type="radio"
          id="eatIn"
          name="deliveryMethod"
          value="eatIn"
          aria-labelledby="labelEatIn"
          onChange={handleDeliveryMethod}
          checked={currentDeliveryMethod === "eatIn"}
        />
        <label id="labelEatIn" htmlFor="eatIn">
          Eat In
        </label>
      </motion.div>
    </article>
  );
};

export default DeliveryMethod;
