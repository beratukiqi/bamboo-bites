import OrderItemAdmin from "./OrderItemAdmin";
import { OrderTableProps } from "@/interfaces";

const OrderTable = ({
  orders,
  status,
  activeOrder,
  openModal,
  closeModal,
}: OrderTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="table-header">{status}</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Date</th>
          <th>Time</th>
          <th>Delivery</th>
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
