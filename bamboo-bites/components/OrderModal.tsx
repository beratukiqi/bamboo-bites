import Button from "@/components/Button";
import { useEffect, useState } from "react";
import OrderList from "./OrderList";

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
}

const OrderModal = ({ orderItem }: OrderModalProps) => {
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

  return (
    orderData && (
      <>
        {orderData.status && <h2>{orderData.status}</h2>}
        <p>
          Order number: <span>{orderData.orderNr}</span>
        </p>
        <p>
          Time stamp: <span>{orderData.timeStamp}</span>
        </p>
        <p>
          Delivery method: <span>{orderData.deliveryMethod}</span>
        </p>

        <OrderList data={orderData} admin />

        <section className="admin-modal__details">
          <div>
            <p>Total:</p>
            <p>${orderData.totalPrice}</p>
          </div>
          <p>Qty: {getQuantity(orderData.order)}</p>
        </section>
        {shouldShowStatusButton(orderData.status) && (
          <Button
            title={`CHANGE TO ${getNextStatus(
              orderData.status,
              orderData.deliveryMethod
            ).toUpperCase()}`}
            action={changeStatus}
          />
        )}
        <Button
          title={`CHANGE TO ${getNextStatus(
            orderData.status,
            orderData.deliveryMethod
          ).toUpperCase()}`}
          action={changeStatus}
        />
      </>
    )
  );
};

export default OrderModal;
