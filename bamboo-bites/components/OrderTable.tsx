import { useState, useEffect } from "react";
import OrderItemAdmin from "./OrderItemAdmin";

interface OrderProps {
  orderNr: number;
  timeStamp: string;
  status: string;
}

const OrderTable = ({ orders }: { orders: OrderProps[] }) => {
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
            <OrderItemAdmin order={order} key={order.orderNr} />
          ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
