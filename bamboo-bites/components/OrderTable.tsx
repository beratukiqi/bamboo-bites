import OrderItemAdmin from "./OrderItemAdmin";

interface OrderProps {
  orderNr: number;
  timeStamp: string;
  status: string;
}

const OrderTable = ({ orders }: { orders: OrderProps[] }) => {
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
