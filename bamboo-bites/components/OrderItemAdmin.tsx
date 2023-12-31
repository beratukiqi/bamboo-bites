import OrderModal from "./OrderModal";
import { OrderItemAdminProps } from "@/interfaces";

const OrderItemAdmin = ({
  order,
  isOpen,
  openModal,
  closeModal,
}: OrderItemAdminProps) => {
  const styleStatus = (status: string) => {

    switch (status) {
      case "pending":
        return "pending-status";
      case "cooking":
        return "cooking-status";
      case "ready":
        return "ready-status";
      case "completed":
        return "completed-status";
      default:
        return "";
    }
  };

  const timeStamp = order.timeStamp.split("T");
  const date = timeStamp[0];
  const time = timeStamp[1]

  return (
    <>
      <tr onClick={openModal} key={order.orderNr}>
        <td>{order.orderNr}</td>
        <td>{date}</td>
        <td>{time}</td>
        <td>{order.deliveryMethod}</td>
        <td className={styleStatus(order.status)}>{order.status}</td>
      </tr>
      {isOpen && (
        <OrderModal isOpen={isOpen} orderItem={order} closeModal={closeModal} />
      )}
    </>
  );
};

export default OrderItemAdmin;
