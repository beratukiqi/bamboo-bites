import Button from "@/components/Button";
import { useEffect, useState } from "react";
import OrderList from "./OrderList";
import ReactDOM from "react-dom";
import ContentWrapper from "./ContentWrapper";

interface OrderDetail {
  id: string;
  item: string;
  price: number;
  desc: string;
  imgUrl: string;
  quantity: number;
  orderNr: number;
}

interface Order {
  order: OrderDetail[];
  orderNr: string;
  status: string;
  timeStamp: string;
  totalPrice: number;
  deliveryMethod: string;
}

interface OrderModalProps {
  orderItem: Order;
  isOpen: boolean;
  closeModal: () => void;
}

const OrderModal = ({ orderItem, isOpen, closeModal }: OrderModalProps) => {
  const [orderData, setOrderData] = useState<Order>(orderItem);

  const getNextStatus = (
    currentStatus: string,
    deliveryMethod: string
  ): string => {
    switch (currentStatus) {
      case "pending":
        return "cooking";
      case "cooking":
        // Determine next status based on delivery method
        return deliveryMethod === "delivery"
          ? "ready for delivery"
          : "ready for pickup";
      case "ready for pickup":
        return "picked up";
      case "ready for delivery":
        return "delivered";
      default:
        return "pending";
    }
  };

  const shouldShowStatusButton = (currentStatus: string): boolean => {
    return !["delivered", "picked up"].includes(currentStatus);
  };

  useEffect(() => {
    setOrderData(orderItem);
  }, [orderItem]);

  const changeStatus = async () => {
    const nextStatus = getNextStatus(
      orderData.status,
      orderData.deliveryMethod
    );
    const response = await fetch(
      `https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/updateOrderStatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNr: orderData.orderNr,
          status: nextStatus,
        }),
      }
    );
    const data = await response.json();
    console.log("RESPONSE HERE", data);
    setOrderData({ ...orderData, status: nextStatus }); // Update the status in state
  };

  const getQuantity = (order: OrderDetail[]): number => {
    return order.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  if (!isOpen) return null;

  const modalContent = (
    <section className="admin-modal">
      <article>
        <button onClick={closeModal}>CLOSE</button>
        {orderData.status && <h2>{orderData.status}</h2>}
        <section className="admin-modal__orderInfo">
          <p>
            Order number: <span>{orderData.orderNr}</span>
          </p>
          <p>
            Delivery method:{" "}
            <span>
              {orderData.deliveryMethod ? orderData.deliveryMethod : "Unknown"}
            </span>
          </p>
          <p>
            {/* : <span>{orderData.timeStamp}</span> */}
            Order time: <span>{orderData.timeStamp}</span>
          </p>
        </section>

        <OrderList data={orderData} admin />

        <section className="admin-modal__details">
          <div>
            <p>Total:</p>
            <p>${orderData.totalPrice}</p>
          </div>
          <p>Qty: {getQuantity(orderData.order)}</p>
        </section>
        <section className="admin-modal__buttons">
          <Button title={"BACK"} action={changeStatus} />
          {shouldShowStatusButton(orderData.status) && (
            <Button
              title={`CHANGE TO ${getNextStatus(
                orderData.status,
                orderData.deliveryMethod
              ).toUpperCase()}`}
              action={changeStatus}
            />
          )}
        </section>
      </article>
    </section>
  );

  const targetElement = document.querySelector(".berattest");

  // Render the modal content inside the target element using a Portal
  return targetElement
    ? ReactDOM.createPortal(modalContent, targetElement)
    : null;
};

export default OrderModal;