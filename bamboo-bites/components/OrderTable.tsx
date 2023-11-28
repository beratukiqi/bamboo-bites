import { useState } from "react";
import OrderItemAdmin from "./OrderItemAdmin";

interface OrderProps {
  orderNr: number;
  timeStamp: string;
  status: string;
}

const OrderTable = ({ orders }: { orders: OrderProps[] }) => {
  const [activeOrder, setActiveOrder] = useState(null);

  const openModal = (order: any) => {
    setActiveOrder(order);
  };

  const closeModal = () => {
    setActiveOrder(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((order) => (
            <OrderItemAdmin
              key={order.orderNr}
              order={order}
              isOpen={activeOrder === order}
              openModal={() => openModal(order)}
              closeModal={closeModal}
            />
          ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
