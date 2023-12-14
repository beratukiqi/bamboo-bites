import { useState } from "react";
import PaymentInput from "./PaymentInput";
import { SvgIcons } from "./SvgIcons";
import { motion } from "framer-motion";

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("applePay");
  return (
    <>
      <article className="payment-method">
        <motion.div
          whileHover={{
            backgroundColor: "rgb(53, 53, 53)",
            cursor: "pointer",
            transition: { duration: 0.1 },
          }}
          className="payment-method__choice"
        >
          <input
            type="radio"
            id="card"
            name="paymentMethod"
            value="card"
            aria-labelledby="labelPayment"
            onChange={() => setPaymentMethod("card")}
            checked={paymentMethod === "card"}
          />
          <label id="labelPayment" htmlFor="card">
            {SvgIcons.CardIcon}
          </label>
        </motion.div>
        {paymentMethod === "card" && <PaymentInput />}
        <motion.div
          whileHover={{
            backgroundColor: "rgb(53, 53, 53)",
            cursor: "pointer",
            transition: { duration: 0.1 },
          }}
          className="payment-method__choice"
        >
          <input
            type="radio"
            id="applePay"
            name="paymentMethod"
            value="applePay"
            aria-labelledby="labelPayment"
            onChange={() => setPaymentMethod("applePay")}
            checked={paymentMethod === "applePay"}
          />
          <label id="labelPayment" htmlFor="applePay">
            {SvgIcons.ApplePayIcon}
          </label>
        </motion.div>
        <motion.div
          whileHover={{
            backgroundColor: "rgb(53, 53, 53)",
            cursor: "pointer",
            transition: { duration: 0.1 },
          }}
          className="payment-method__choice"
        >
          <input
            type="radio"
            id="googlePay"
            name="paymentMethod"
            value="googlePay"
            aria-labelledby="labelPayment"
            onChange={() => setPaymentMethod("googlePay")}
            checked={paymentMethod === "googlePay"}
          />
          <label id="labelPayment" htmlFor="googlePay">
            {SvgIcons.GooglePayIcon}
          </label>
        </motion.div>
      </article>
    </>
  );
};

export default PaymentMethod;
