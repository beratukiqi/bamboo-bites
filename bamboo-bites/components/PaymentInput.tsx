import { useEffect, useRef, useState } from "react";

const PaymentInput = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const formatCardNumber = (value: string) => {
    // Remove non-digits and limit to 16 characters
    const cleaned = value.replace(/\D/g, "").substring(0, 16);

    // Insert dash after every 4 characters
    const formatted = cleaned.match(/.{1,4}/g)?.join("-") ?? "";

    // Add a dash after the 4th, 8th, and 12th character if needed
    if (cleaned.length === 4 || cleaned.length === 8 || cleaned.length === 12) {
      return formatted + "-";
    }

    return formatted;
  };

  const handleCardNumberChange = (event) => {
    let inputValue = event.target.value;
    let formattedValue = formatCardNumber(inputValue);
    setCardNumber(formattedValue);
  };

  const formatExpiryDate = (value) => {
    // Remove non-digits and limit to 4 characters (MMYY)
    const cleaned = value.replace(/\D/g, "").substring(0, 4);

    // Insert slash after MM if length is more than 2
    if (cleaned.length > 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
    }

    return cleaned;
  };

  const handleExpiryChange = (event) => {
    const formattedValue = formatExpiryDate(event.target.value);
    setCardExpiry(formattedValue);
  };

  const handleCVCChange = (event) => {
    const value = event.target.value;

    // Remove non-digits and limit to 3 characters
    const formattedValue = value.replace(/\D/g, "").substring(0, 3);

    setCardCVC(formattedValue);
  };

  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "cardNumber":
        if (value.replace(/-/g, "").length !== 16) {
          setErrors({ ...errors, cardNumber: "Card number must be 16 digits" });
        } else {
          setErrors({ ...errors, cardNumber: "" });
        }
        break;
      case "cardExpiry":
        if (value.length !== 5) {
          setErrors({
            ...errors,
            cardExpiry: "Expiry date must be in MM/YY format",
          });
        } else {
          setErrors({ ...errors, cardExpiry: "" });
        }
        break;
      case "cardCVC":
        if (value.length !== 3) {
          setErrors({ ...errors, cardCVC: "CVC must be 3 digits" });
        } else {
          setErrors({ ...errors, cardCVC: "" });
        }
        break;
      default:
        break;
    }
  };

  return (
    <section className="payment-input">
      <form>
        <label htmlFor="cardNumber">Card number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="1234-1234-1234-1234"
          value={cardNumber}
          onChange={handleCardNumberChange}
          onBlur={() => validateField("cardNumber", cardNumber)}
        />
        {errors.cardNumber && <p>{errors.cardNumber}</p>}

        <div>
          <div>
            <label htmlFor="cardExpiry">Expiry date</label>
            <input
              type="text"
              id="cardExpiry"
              name="cardExpiry"
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={handleExpiryChange}
              onBlur={() => validateField("cardExpiry", cardExpiry)}
            />
            {errors.cardExpiry && <p>{errors.cardExpiry}</p>}
          </div>
          <div>
            <label htmlFor="cardCVC">CVC</label>
            <input
              type="text"
              id="cardCVC"
              name="cardCVC"
              placeholder="123"
              maxLength={3}
              value={cardCVC}
              onChange={handleCVCChange}
              onBlur={() => validateField("cardCVC", cardCVC)}
            />
            {errors.cardCVC && <p>{errors.cardCVC}</p>}
          </div>
        </div>
        <label htmlFor="cardName">Name on card</label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          placeholder="John Doe"
        />
      </form>
    </section>
  );
};

export default PaymentInput;
