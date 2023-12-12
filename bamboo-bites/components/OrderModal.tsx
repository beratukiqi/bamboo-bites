import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import OrderList from "./OrderList";
import Button from "@/components/Button";
import { Order, OrderDetail, OrderModalProps } from "@/interfaces";
import { SvgIcons } from "./SvgIcons";

const OrderModal = ({ orderItem, isOpen, closeModal }: OrderModalProps) => {
  const [orderData, setOrderData] = useState<Order>(orderItem);
  const API_URL = "https://x1keilhp1a.execute-api.eu-north-1.amazonaws.com/api/updateOrderStatus"

  const getNextStatus = (
    currentStatus: string,
    deliveryMethod: string
  ): string => {
    switch (currentStatus) {
      case "pending":
        return "cooking";
      case "cooking":
        // Determine next status based on delivery method
        return "ready";
      case "ready":
        return "completed";
      default:
        return "pending"; // Or handle the default case as needed
    }
  };

  const getPreviousStatus = (
    currentStatus: string,
    deliveryMethod: string
  ): string => {
    switch (currentStatus) {
      case "completed":
        return "ready";
      case "ready":
        return "cooking";
      default:
        return "";
    }
  };

  const shouldShowStatusButton = (currentStatus: string): boolean => {
    return !["completed"].includes(currentStatus);
  };

  const shouldShowBackButton = (currentStatus: string): boolean => {
    return !["pending", "cooking"].includes(currentStatus);
  };

  useEffect(() => {
    setOrderData(orderItem);
  }, [orderItem]);

  const changeStatus = async (step: string) => {
    const newStatus =
      step === "BACK"
        ? getPreviousStatus(orderData.status, orderData.deliveryMethod)
        : getNextStatus(orderData.status, orderData.deliveryMethod);

    const response = await fetch(
      API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNr: orderData.orderNr,
          status: newStatus,
        }),
      }
    );
    const data = await response.json();
    setOrderData({ ...orderData, status: newStatus }); // Update the status in state
  };

  const getQuantity = (order: OrderDetail[]): number => {
    return order.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  if (!isOpen) return null;

  const modalContent = (
    <section className="admin-modal">
      <article>
        <span className="admin-modal__close" onClick={closeModal}>
          {SvgIcons.CloseIcon}
        </span>
        {orderData.status && <h2>{orderData.status}</h2>}
        <section className="admin-modal__orderInfo">
          <p className="admin-modal__orderInfo--orderNr">
            Order <span>{orderData.orderNr}</span>
          </p>
          <p className="admin-modal__orderInfo--timeStamp">
            <span>{orderData.timeStamp}</span>
          </p>

          <p className="admin-modal__orderInfo--deliveryMethod">
            Delivery method:{" "}
            <span>
              {orderData.deliveryMethod ? orderData.deliveryMethod : "Unknown"}
            </span>
          </p>
        </section>

        <OrderList data={orderData} admin />

        <section className="admin-modal__details">
          <div>
            <p>
              <b>Total:</b>
            </p>
            <p>Qty: {getQuantity(orderData.order)}</p>
            <p>${orderData.totalPrice}</p>
          </div>
        </section>
        <section className="admin-modal__buttons">
          {shouldShowBackButton(orderData.status) && (
            <Button
              title={`UNDO TO ${getPreviousStatus(
                orderData.status,
                orderData.deliveryMethod
              ).toUpperCase()}`}
              action={() => changeStatus("BACK")}
            />
          )}
          {shouldShowStatusButton(orderData.status) && (
            <Button
              title={`${getNextStatus(
                orderData.status,
                orderData.deliveryMethod
              ).toUpperCase()}`}
              action={() => changeStatus("NEXT")}
            />
          )}
        </section>
      </article>
    </section>
  );

  const targetElement = document.querySelector(".modal-target-container");

  // Render the modal content inside the target element using a Portal
  return targetElement
    ? ReactDOM.createPortal(modalContent, targetElement)
    : null;
};

export default OrderModal;
