import { useState } from "react";
import OrderModal from "./OrderModal";

const OrderItemAdmin = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const styleStatus = (status: string) => {
    console.log("style", status);

    switch (status) {
      case "pending":
        return "pending-status";
      case "cooking":
        return "cooking-status";
      case "pick-up":
        return "pickUp-status";
      case "delivery":
        return "delivery-status";
      case "picked-up":
        return "pickUp-status";
      case "delivered":
        return "delivery-status";
      default:
        return "";
    }
  };
  return (
    <>
      <tr onClick={() => setIsOpen(true)} key={order.orderNr}>
        <td>{order.orderNr}</td>
        <td>{order.timeStamp}</td>
        <td className={styleStatus(order.status)}>{order.status}</td>
      </tr>
      {isOpen && (
        <OrderModal isOpen={isOpen} closeModal={closeModal} orderItem={order} />
      )}
    </>
  );
};

export default OrderItemAdmin;
